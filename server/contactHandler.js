import tls from "node:tls";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 160;
const MAX_MESSAGE_LENGTH = 4000;

// Simple in-memory rate limit (max 5 contact submissions per 10 minutes per IP)
const rateMap = new Map();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(clientKey) {
  const now = Date.now();
  const entry = rateMap.get(clientKey);
  if (!entry || now - entry.start > RATE_WINDOW_MS) {
    rateMap.set(clientKey, { start: now, count: 1 });
    return true;
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  entry.count += 1;
  return true;
}

function sanitizeHeaderValue(value) {
  return String(value || "").replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function encodeMimeHeaderUtf8(text) {
  return `=?UTF-8?B?${Buffer.from(text, "utf8").toString("base64")}?=`;
}

function wrapBase64(b64) {
  return b64.replace(/(.{76})/g, "$1\r\n");
}

/**
 * Dependency-free IPv4 TLS SMTP client for smtp.gmail.com:465 using a Gmail App Password.
 */
function sendViaGmailSmtps({ gmailUser, gmailAppPassword, toEmail, replyTo, senderName, subject, htmlBody }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect({
      host: "smtp.gmail.com",
      port: 465,
      servername: "smtp.gmail.com",
      family: 4,
      timeout: 15000,
    });

    let buffer = "";
    let currentWaiter = null;

    const fail = (err) => {
      currentWaiter = null;
      if (!socket.destroyed) socket.destroy();
      reject(err);
    };

    socket.setEncoding("utf8");
    socket.on("timeout", () => fail(new Error("Gmail SMTP connection timed out")));
    socket.on("error", (err) => fail(err));

    const tryFlushLines = () => {
      if (!currentWaiter) return;
      const lines = buffer.split("\r\n");
      // Wait until we have at least one complete CRLF-terminated final SMTP response line ("XYZ ...")
      let consumedChars = 0;
      const fullLines = [];

      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i];
        consumedChars += line.length + 2;
        fullLines.push(line);

        if (/^\d{3}( |$)/.test(line)) {
          buffer = buffer.slice(consumedChars);
          const code = Number(line.slice(0, 3));
          const waiter = currentWaiter;
          currentWaiter = null;
          waiter({ code, text: fullLines.join("\n") });
          return;
        }
      }
    };

    socket.on("data", (chunk) => {
      buffer += chunk;
      tryFlushLines();
    });

    const expectResponse = () =>
      new Promise((res) => {
        currentWaiter = res;
        tryFlushLines();
      });

    const sendCommand = async (cmd, expectedPrefix) => {
      socket.write(`${cmd}\r\n`);
      const resp = await expectResponse();
      if (Math.floor(resp.code / 100) !== expectedPrefix && resp.code !== expectedPrefix) {
        throw new Error(`SMTP error (${resp.code}): ${resp.text}`);
      }
      return resp;
    };

    (async () => {
      try {
        const greeting = await expectResponse();
        if (greeting.code !== 220) {
          throw new Error(`Unexpected SMTP greeting: ${greeting.text}`);
        }

        await sendCommand("EHLO portfolio.local", 250);
        await sendCommand("AUTH LOGIN", 334);
        await sendCommand(Buffer.from(gmailUser, "utf8").toString("base64"), 334);
        await sendCommand(
          Buffer.from(gmailAppPassword.replace(/\s+/g, ""), "utf8").toString("base64"),
          235
        );

        await sendCommand(`MAIL FROM:<${gmailUser}>`, 250);
        await sendCommand(`RCPT TO:<${toEmail}>`, 250);
        await sendCommand("DATA", 354);

        const encodedFromName = encodeMimeHeaderUtf8(`${senderName} (via Portfolio)`);
        const encodedSubject = encodeMimeHeaderUtf8(subject);
        const encodedHtml = wrapBase64(Buffer.from(htmlBody, "utf8").toString("base64"));

        const mimeMessage = [
          `From: ${encodedFromName} <${gmailUser}>`,
          `To: <${toEmail}>`,
          `Reply-To: ${encodeMimeHeaderUtf8(senderName)} <${replyTo}>`,
          `Subject: ${encodedSubject}`,
          `Date: ${new Date().toUTCString()}`,
          "MIME-Version: 1.0",
          "Content-Type: text/html; charset=UTF-8",
          "Content-Transfer-Encoding: base64",
          "",
          encodedHtml,
          ".",
        ].join("\r\n");

        await sendCommand(mimeMessage, 250);
        socket.write("QUIT\r\n");
        socket.end();
        resolve();
      } catch (err) {
        fail(err);
      }
    })();
  });
}

/**
 * Handles POST /api/contact securely on the backend and delivers messages to Gmail.
 */
export async function handleContactRequest(payload, env = process.env, clientIp = "local") {
  if (!checkRateLimit(clientIp)) {
    return {
      status: 429,
      body: { error: "Too many messages sent recently. Please try again in a few minutes." },
    };
  }

  const rawName = sanitizeHeaderValue(payload?.name).slice(0, MAX_NAME_LENGTH);
  const rawEmail = sanitizeHeaderValue(payload?.email).slice(0, MAX_EMAIL_LENGTH);
  const rawMessage = typeof payload?.message === "string" ? payload.message.trim().slice(0, MAX_MESSAGE_LENGTH) : "";

  if (!rawName || rawName.length < 2) {
    return { status: 400, body: { error: "Please enter your name." } };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(rawEmail)) {
    return { status: 400, body: { error: "Please enter a valid email address." } };
  }

  if (!rawMessage || rawMessage.length < 3) {
    return { status: 400, body: { error: "Please enter a message." } };
  }

  const gmailUser = sanitizeHeaderValue(env?.GMAIL_USER || "lartab.abderrahmane@gmail.com");
  const gmailAppPassword = (env?.GMAIL_APP_PASSWORD || "").trim();
  const receiverEmail = sanitizeHeaderValue(env?.CONTACT_RECEIVER_EMAIL || gmailUser);

  if (
    !gmailAppPassword ||
    gmailAppPassword === "your_16_char_gmail_app_password"
  ) {
    return {
      status: 503,
      body: {
        error:
          "Email service is not configured yet. Please add GMAIL_APP_PASSWORD in .env.",
      },
    };
  }

  const safeNameHtml = escapeHtml(rawName);
  const safeEmailHtml = escapeHtml(rawEmail);
  const safeMessageHtml = escapeHtml(rawMessage).replace(/\r?\n/g, "<br />");

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0;">
      <h2 style="margin: 0 0 16px; color: #0c5a84; font-size: 20px;">New Portfolio Contact Message</h2>
      <div style="background: #ffffff; padding: 18px 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
        <p style="margin: 0 0 8px; color: #334155; font-size: 14px;"><strong>From:</strong> ${safeNameHtml}</p>
        <p style="margin: 0 0 16px; color: #334155; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${safeEmailHtml}" style="color: #0c5a84;">${safeEmailHtml}</a></p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 14px 0;" />
        <div style="color: #0f172a; font-size: 15px; line-height: 1.6;">${safeMessageHtml}</div>
      </div>
      <p style="margin: 14px 0 0; font-size: 12px; color: #64748b;">Tip: Click <strong>Reply</strong> in Gmail to respond directly to ${safeNameHtml} (${safeEmailHtml}).</p>
    </div>
  `;

  try {
    await sendViaGmailSmtps({
      gmailUser,
      gmailAppPassword,
      toEmail: receiverEmail,
      replyTo: rawEmail,
      senderName: rawName,
      subject: `Portfolio Message from ${rawName}`,
      htmlBody,
    });

    return {
      status: 200,
      body: { ok: true, message: "Message sent successfully!" },
    };
  } catch (error) {
    console.error("[Gmail SMTP error]", error?.message || error);
    return {
      status: 500,
      body: {
        error:
          "Failed to send email. Please verify your GMAIL_APP_PASSWORD or email lartab.abderrahmane@gmail.com directly.",
      },
    };
  }
}
