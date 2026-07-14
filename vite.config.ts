import { defineConfig, type ViteDevServer } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "path";
import fs from "fs";


function headerPlugin() {
  return {
    name: "configure-server-headers",
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.match(/contours\/(\d{8})\/(\d+)\/(\d+)\/(\d+)\.pbf/)) {
          // Strip any query strings Vite adds (like ?v=123)
          const cleanUrl = req.url.split("?")[0];
          // Resolve the absolute path to your local tile directory
          const filePath = path.join(process.cwd(), "public", cleanUrl);

          if (fs.existsSync(filePath)) {
            res.writeHead(200, {
              "Content-Type": "application/x-protobuf",
              "Content-Encoding": "gzip",
            });
            fs.createReadStream(filePath).pipe(res);
            return; // Stop here! Do not call next() so Vite can't touch it.
          }
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    headerPlugin(),
  ],
}));
