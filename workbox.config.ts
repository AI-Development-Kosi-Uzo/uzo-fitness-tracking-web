import { generateSW } from 'workbox-build'

export async function buildSW() {
  return generateSW({
    globDirectory: 'app/dist',
    globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
    swDest: 'app/dist/sw.js',
    skipWaiting: true,
    clientsClaim: true,
    importScripts: ['sw-custom.js'],
    runtimeCaching: [
      {
        urlPattern: ({ request }) => request.destination === 'image',
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
        },
      },
      {
        urlPattern: ({ request }) => request.method === 'GET',
        handler: 'StaleWhileRevalidate',
        options: { cacheName: 'runtime' },
      },
    ],
    navigateFallback: '/index.html',
  })
}