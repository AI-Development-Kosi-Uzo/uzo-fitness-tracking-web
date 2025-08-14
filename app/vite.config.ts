import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      strategies: 'generateSW',
      workbox: {
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /\/api\/.*/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'api-cache' },
          },
          {
            urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: /\/api\/.*/,
            handler: 'NetworkOnly',
            method: 'POST',
            options: {
              backgroundSync: {
                name: 'uzofitness-sync',
                options: { maxRetentionTime: 24 * 60 },
              },
            },
          },
        ],
      },
      devOptions: { enabled: true, type: 'module' },
      manifest: {
        name: 'UzoFitness',
        short_name: 'UzoFit',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#FFFFFF',
        theme_color: '#0EA5E9',
        description: 'Track workouts, progress photos, and training plans offline.',
        icons: [
          {
            src: '/vite.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/vite.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable any',
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 5174,
    allowedHosts: ['host.docker.internal', 'localhost', '127.0.0.1', '192.168.86.33'],
  },
  // Vitest config lives under the "vitest" key when using Vite's config file
  // but TypeScript typing for defineConfig(UserConfig) may not include it.
  // We'll configure Vitest via a separate vitest.config.ts if needed later.
})
