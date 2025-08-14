import { generateSW } from 'workbox-build'

export async function buildSW() {
  // This file is a stub; in CI we can run a custom build step if needed
  return generateSW({
    globDirectory: 'app/dist',
    globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
    swDest: 'app/dist/sw.js',
    skipWaiting: true,
    clientsClaim: true,
  })
}