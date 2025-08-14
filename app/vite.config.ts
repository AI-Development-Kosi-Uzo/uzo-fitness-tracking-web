import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5174,
    allowedHosts: ['host.docker.internal', 'localhost', '127.0.0.1', '192.168.86.33'],
  },
  // Vitest config lives under the "vitest" key when using Vite's config file
  // but TypeScript typing for defineConfig(UserConfig) may not include it.
  // We'll configure Vitest via a separate vitest.config.ts if needed later.
})
