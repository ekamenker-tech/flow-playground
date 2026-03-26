import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative asset paths keep the build portable across GitHub Pages repo URLs.
  base: "./",
  plugins: [react()],
});
