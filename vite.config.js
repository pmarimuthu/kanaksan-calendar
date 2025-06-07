import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.png", "apple-touch-icon.png"],
      manifest: {
        name: "Kanaksan Daily Sheets App",
        short_name: "Kanaksan App",
        description: "Daily calendar sheets viewer with weather insights",
        theme_color: "#1976d2",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/K-192x192.png",  // Note the leading slash
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/K-512x512.png",  // Note the leading slash
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"]
      }
    }),
  ],
});