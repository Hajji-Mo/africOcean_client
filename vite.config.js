import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [envCompatible(), react()],
  build: {
    outDir: "dist", // This is the output directory for the build
  },
  server: {
    host: true,
    strictPort: true,
    port: 80,
  },
});
