self.addEventListener('install', () => {
  // @ts-expect-error service worker global skipWaiting not in TS lib
  self.skipWaiting()
})

self.addEventListener('activate', () => {
  // @ts-expect-error service worker clients.claim not in TS lib
  self.clients.claim()
})