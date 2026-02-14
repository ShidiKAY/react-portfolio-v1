import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/"))
            return "react-vendor";
          if (id.includes("node_modules/framer-motion")) return "framer";
          if (id.includes("node_modules/react-router")) return "router";
          if (id.includes("node_modules/i18next") || id.includes("node_modules/react-i18next"))
            return "i18n";
          if (id.includes("translations/en.json")) return "lang-en";
        },
      },
    },
    minify: "esbuild",
    sourcemap: false,
  },
});
