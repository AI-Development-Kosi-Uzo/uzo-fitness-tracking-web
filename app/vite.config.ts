import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@data': path.resolve(__dirname, 'src/data'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@sw': path.resolve(__dirname, 'src/sw'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  server: {
    host: true,
    port: 5174,
    allowedHosts: ['host.docker.internal', 'localhost', '127.0.0.1', '192.168.86.33'],
  },
  // Vitest config lives under the "vitest" key when using Vite's config file
  // but TypeScript typing for defineConfig(UserConfig) may not include it.
  // We'll configure Vitest via a separate vitest.config.ts if needed later.
})
