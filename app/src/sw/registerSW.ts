export function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = '/sw.js'
      navigator.serviceWorker
        .register(swUrl)
        .then(async (registration) => {
          try {
            const anyReg = registration as any
            await anyReg.sync?.register('uzofitness-sync')
          } catch {
            // background sync not supported; ignore
          }
        })
        .catch(() => {
          // swallow errors for now
        })
    })
  }
}