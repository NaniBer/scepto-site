import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const CONTENT_FILE = join(process.cwd(), "public/content.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "scepto123";

function localApiPlugin() {
  return {
    name: "local-api",
    configureServer(server) {
      server.middlewares.use("/api/content", (req, res, next) => {
        if (req.method === "GET") {
          try {
            const raw = readFileSync(CONTENT_FILE, "utf-8");
            res.setHeader("Content-Type", "application/json");
            res.end(raw);
          } catch {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Failed to read content" }));
          }
          return;
        }

        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", () => {
            const auth = req.headers.authorization;
            if (!auth || auth.slice(7) !== ADMIN_PASSWORD) {
              res.statusCode = 401;
              res.end(JSON.stringify({ error: "Invalid password" }));
              return;
            }
            try {
              const parsed = JSON.parse(body);
              writeFileSync(CONTENT_FILE, JSON.stringify(parsed, null, 2));
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true }));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: "Invalid body" }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localApiPlugin()],
  server: { port: 5173, host: true },
});