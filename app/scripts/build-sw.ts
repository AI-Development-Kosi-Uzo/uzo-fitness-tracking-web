const { buildSW } = await import(new URL('../../workbox.config.ts', import.meta.url).pathname)
await buildSW()
console.log('Service worker generated at app/dist/sw.js')