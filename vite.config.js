import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    host: "0.0.0.0",
  },
  preview: {
    port: 4000,
    host: "0.0.0.0",
    allowedHosts: ["cmky8bfih000052f54vu-tnnb02.sysko.io", "app.sysko.io"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
