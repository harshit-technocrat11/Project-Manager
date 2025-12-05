import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  css: {
    transformer: "postcss",
    lightningcss: false, 
  },

  optimizeDeps: {
    exclude: ["lightningcss"], 
  },

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8001/",

        changeOrigin: true,
      },
    },
  },
});
