import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { handleChatRequest } from "./geminiHandler.js";
import { handleContactRequest } from "./contactHandler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

/**
 * Minimal .env loader (no extra dependency required) for standalone Node runs.
 */
function loadLocalEnv() {
  const envPath = path.join(rootDir, ".env");
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const val = trimmed
      .slice(eqIndex + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    if (key && !(key in process.env)) {
      process.env[key] = val;
    }
  }
}

loadLocalEnv();

const PORT = Number(process.env.API_PORT || 3001);

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === "/api/health" && req.method === "GET") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        ok: true,
        geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
      })
    );
    return;
  }

  if ((req.url !== "/api/chat" && req.url !== "/api/contact") || req.method !== "POST") {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not found" }));
    return;
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
    if (body.length > 64 * 1024) {
      req.destroy();
    }
  });

  req.on("end", async () => {
    try {
      const payload = JSON.parse(body || "{}");
      const clientIp = req.socket?.remoteAddress || "local";
      const result =
        req.url === "/api/contact"
          ? await handleContactRequest(payload, process.env, clientIp)
          : await handleChatRequest(payload, process.env);
      res.writeHead(result.status);
      res.end(JSON.stringify(result.body));
    } catch {
      res.writeHead(400);
      res.end(JSON.stringify({ error: "Invalid JSON body" }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Portfolio AI API server listening on http://localhost:${PORT}`);
});
