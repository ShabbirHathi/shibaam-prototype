import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Get base path from environment variable for GitHub Pages
  // Format: /repository-name/ or empty string for root
  // Vite automatically reads VITE_* prefixed environment variables
  const base = process.env.VITE_BASE_PATH || '/';

  console.log('Vite base path:', base);

  return {
    base,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});