import { handleContactRequest } from "../server/contactHandler.js";

/**
 * Vercel Serverless Function endpoint: POST /api/contact
 * Reads GMAIL_USER & GMAIL_APP_PASSWORD securely from server environment variables.
 */
export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const payload =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const clientIp =
      req.headers?.["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      "unknown";
    const result = await handleContactRequest(payload, process.env, clientIp);
    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error("[/api/contact error]", error);
    return res.status(400).json({ error: "Invalid request payload." });
  }
}
