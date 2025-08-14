type ServiceWorkerRegistrationWithSync = ServiceWorkerRegistration & {
  sync?: { register: (tag: string) => Promise<void> }
}

export function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = '/sw.js'
      navigator.serviceWorker
        .register(swUrl)
        .then(async (registration) => {
          try {
            const reg = registration as ServiceWorkerRegistrationWithSync
            await reg.sync?.register('uzofitness-sync')
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