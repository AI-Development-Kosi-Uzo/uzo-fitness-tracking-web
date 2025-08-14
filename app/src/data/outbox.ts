export type OutboxRequest = {
  id?: number
  url: string
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  body?: unknown
}

const DB_NAME = 'uzofitness-outbox'
const STORE_NAME = 'queue'
const SYNC_TAG = 'uzofitness-sync'

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function put(item: OutboxRequest): Promise<number> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    const req = store.put(item)
    req.onsuccess = () => resolve(req.result as number)
    req.onerror = () => reject(req.error)
  })
}

async function getAll(): Promise<OutboxRequest[]> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const req = store.getAll()
    req.onsuccess = () => resolve(req.result as OutboxRequest[])
    req.onerror = () => reject(req.error)
  })
}

async function remove(id: number): Promise<void> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    const req = store.delete(id)
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
}

async function tryRegisterSync(): Promise<void> {
  try {
    const registration = await navigator.serviceWorker?.ready
    // @ts-expect-error: sync may be undefined in some browsers
    await registration?.sync?.register(SYNC_TAG)
  } catch {
    // ignore
  }
}

export async function enqueueMutation(request: OutboxRequest): Promise<number> {
  const id = await put(request)
  // Kick the SW to process soon
  await tryRegisterSync()
  // Also attempt immediate flush in case we're online
  void flushPending()
  return id
}

export async function getQueueSize(): Promise<number> {
  const items = await getAll()
  return items.length
}

export async function flushPending(): Promise<void> {
  const items = await getAll()
  for (const item of items) {
    try {
      const { id, url, method, headers, body } = item
      const response = await fetch(url, {
        method,
        headers: headers ?? { 'content-type': 'application/json' },
        body: body == null ? undefined : (typeof body === 'string' ? body : JSON.stringify(body)),
      })
      if (response.ok) {
        if (typeof id === 'number') {
          await remove(id)
        }
      }
    } catch {
      // stay queued; SW sync will retry later
    }
  }
}

// Optional: listen for online to flush quickly
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    void tryRegisterSync()
    void flushPending()
  })
}