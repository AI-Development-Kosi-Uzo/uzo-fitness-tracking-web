import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(new URL(import.meta.url)))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({ jsxImportSource: 'react', plugins: [] })],
  resolve: {
    alias: {
      '@data': resolve(__dirname, 'src/data'),
      '@components': resolve(__dirname, 'src/components'),
      '@routes': resolve(__dirname, 'src/routes'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@sw': resolve(__dirname, 'src/sw'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
  server: {
    host: true,
    port: 5174,
    allowedHosts: ['host.docker.internal', 'localhost', '127.0.0.1', '192.168.86.33'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['@tanstack/react-router'],
          query: ['@tanstack/react-query'],
          charts: ['recharts'],
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
  // Vitest config lives under the "vitest" key when using Vite's config file
  // but TypeScript typing for defineConfig(UserConfig) may not include it.
  // We'll configure Vitest via a separate vitest.config.ts if needed later.
})
