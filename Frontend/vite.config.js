import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000", // it will work only localhost
    },
  },
  build: {
    chunkSizeWarningLimit: 2000, // Adjust this value as needed
  },
});
