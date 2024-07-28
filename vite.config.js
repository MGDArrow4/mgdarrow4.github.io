import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: "Funerals",
        short_name: "Funerals",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        theme_color: "#208B9A",
        background_color: "#FF7A00",
        lang: "ru",
      },
    }),
  ],
  base: '/',
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/__variables.scss";`,
      },
    },
  },
});
