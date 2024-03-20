import react from "@vitejs/plugin-react"; // Import React plugin for JSX support
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import postcss from "vite-plugin-postcss";

export default defineConfig({
  plugins: [
    react(),
    postcss({
      plugins: [tailwindcss(), autoprefixer()],
    }),
  ],
});
