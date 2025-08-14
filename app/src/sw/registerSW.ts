export function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = '/sw.js'
      navigator.serviceWorker
        .register(swUrl)
        .catch(() => {
          // swallow errors for now
        })
    })
  }
}