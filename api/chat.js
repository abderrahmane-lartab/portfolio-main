import { handleChatRequest } from "../server/geminiHandler.js";

/**
 * Vercel Serverless Function endpoint: POST /api/chat
 * Reads GEMINI_API_KEY securely from server environment variables.
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
    const result = await handleChatRequest(payload, process.env);
    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error("[/api/chat error]", error);
    return res.status(400).json({ error: "Invalid request payload." });
  }
}
