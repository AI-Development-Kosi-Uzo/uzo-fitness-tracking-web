### PWA Specification

#### Manifest
- name: UzoFitness
- short_name: UzoFit
- start_url: "/"
- display: standalone
- background_color: "#FFFFFF"
- theme_color: "#0EA5E9"
- icons: 192, 512, maskable (export from existing app icons)

#### Service Worker (Workbox)
- Precaching: app shell (HTML, CSS, JS chunks), route assets
- Runtime caching:
  - API GETs: StaleWhileRevalidate
  - Images: CacheFirst with expiring cache
  - Dexie/IndexedDB: native; SW not required
- Background Sync:
  - Queue mutations under tag `uzofitness-sync`
  - Retries with exponential backoff

#### Installability
- Served over HTTPS
- Correct manifest + SW registered
- User prompt strategy: custom "Add to Home Screen" button showing when eligible

#### Offline strategy
- App shell works offline; route-level data from IndexedDB
- Mutations queued when offline; flushed on connectivity

#### Notifications (optional)
- Web Push (if Supabase/FCM used). Not required for MVP.


