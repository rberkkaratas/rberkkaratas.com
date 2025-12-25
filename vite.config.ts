import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import path from "path";

const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [
    tailwindcss(),
    react(),
    vitePrerenderPlugin({
      renderTarget: "#app",
      previewMiddlewareFallback: "/404"
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
