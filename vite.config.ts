import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
<<<<<<< HEAD
  // Development-only client->terminal logger endpoint
  configureServer(server) {
    server.middlewares.use("/_client-log", async (req, res) => {
      try {
        let body = "";
        await new Promise<void>((resolve) => {
          req.on("data", (chunk) => (body += chunk));
          req.on("end", () => resolve());
        });
        const payload = body ? JSON.parse(body) : {};
        const level = payload.level || "info";
        const msg = payload.message || "[client-log]";
        const data = payload.data;
        const tag = `CLIENT:${level.toUpperCase()}`;
        // eslint-disable-next-line no-console
        console.log(tag, msg, data ?? "");
        res.statusCode = 204;
        res.end();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("CLIENT:LOG_ERROR", e);
        res.statusCode = 400;
        res.end();
      }
    });
  },
=======
>>>>>>> b62f358138f394885c6991f0be804cb520b5b9ee
}));
