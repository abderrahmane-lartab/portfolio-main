import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { handleChatRequest } from "./server/geminiHandler.js";
import { handleContactRequest } from "./server/contactHandler.js";

function attachJsonPostRoute(middlewares, routePath, handlerFn, mode) {
  middlewares.use(routePath, (req, res) => {
    if (req.method === "OPTIONS") {
      res.statusCode = 204;
      res.end();
      return;
    }

    if (req.method !== "POST") {
      res.statusCode = 405;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Method not allowed" }));
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
        const freshEnv = loadEnv(mode, process.cwd(), "");
        const payload = JSON.parse(body || "{}");
        const clientIp = req.socket?.remoteAddress || "local";
        const result = await handlerFn(
          payload,
          { ...process.env, ...freshEnv },
          clientIp
        );
        res.statusCode = result.status;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(result.body));
      } catch {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
      }
    });
  });
}

function portfolioBackendApiPlugin(mode) {
  const attachMiddleware = (middlewares) => {
    attachJsonPostRoute(middlewares, "/api/chat", handleChatRequest, mode);
    attachJsonPostRoute(middlewares, "/api/contact", handleContactRequest, mode);
  };

  return {
    name: "portfolio-backend-api",
    configureServer(server) {
      attachMiddleware(server.middlewares);
    },
    configurePreviewServer(server) {
      attachMiddleware(server.middlewares);
    },
  };
}

export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), tailwindcss(), portfolioBackendApiPlugin(mode)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
    },
  };
});
