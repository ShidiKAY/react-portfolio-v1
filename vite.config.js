import react from "@vitejs/plugin-react"; // Import React plugin for JSX support
// import postcss from "postcss";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    // postcss({
    //   plugins: [tailwindcss(), autoprefixer()],
    // }),
  ],
});
