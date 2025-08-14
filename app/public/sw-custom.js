const SYNC_TAG = 'uzofitness-sync'

async function readAllFromOutbox() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('uzofitness-outbox', 1)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('queue')) {
        db.createObjectStore('queue', { keyPath: 'id', autoIncrement: true })
      }
    }
    request.onsuccess = () => {
      const db = request.result
      const tx = db.transaction('queue', 'readonly')
      const store = tx.objectStore('queue')
      const getAllReq = store.getAll()
      getAllReq.onsuccess = () => resolve(getAllReq.result)
      getAllReq.onerror = () => reject(getAllReq.error)
    }
    request.onerror = () => reject(request.error)
  })
}

async function removeFromOutbox(id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('uzofitness-outbox', 1)
    request.onsuccess = () => {
      const db = request.result
      const tx = db.transaction('queue', 'readwrite')
      const store = tx.objectStore('queue')
      const delReq = store.delete(id)
      delReq.onsuccess = () => resolve()
      delReq.onerror = () => reject(delReq.error)
    }
    request.onerror = () => reject(request.error)
  })
}

async function flushOutbox() {
  const items = await readAllFromOutbox()
  for (const item of items) {
    try {
      const { id, url, method, headers, body } = item
      const response = await fetch(url, {
        method,
        headers: headers || { 'content-type': 'application/json' },
        body: body == null ? undefined : (typeof body === 'string' ? body : JSON.stringify(body)),
      })
      if (response.ok && typeof id === 'number') {
        await removeFromOutbox(id)
      }
    } catch (err) {
      // leave queued
    }
  }
}

self.addEventListener('sync', (event) => {
  if (event.tag === SYNC_TAG) {
    event.waitUntil(flushOutbox())
  }
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'FLUSH_OUTBOX') {
    event.waitUntil(flushOutbox())
  }
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return

  event.respondWith(
    caches.open('runtime').then(async (cache) => {
      try {
        const response = await fetch(request)
        cache.put(request, response.clone())
        return response
      } catch (e) {
        const cached = await cache.match(request)
        if (cached) return cached
        throw e
      }
    })
  )
})