### Platform Mapping: iOS → Web

| iOS Capability | Swift/Apple API | Web Equivalent | Notes |
|---|---|---|---|
| HealthKit | HealthKitManager (read bodyMass, bodyFat) | Manual entry UI + roadmap for device integrations | No direct browser HealthKit. Optionally Apple Health via iOS Shortcuts + deep links in future. |
| SwiftData | `@Model` entities via `PersistenceController` | IndexedDB via Dexie; optional Supabase Postgres | Mirror schema and relationships; add indexes. |
| Photos / PHPicker | `PhotoService` (auth, save, pick) | Media Capture API / `<input type="file">`, File System Access; Supabase Storage | Store file names in DB; keep local cached URL; upload if cloud sync enabled. |
| Haptics / System sound | `UIImpactFeedbackGenerator`, `AudioServicesPlaySystemSound` | Subtle CSS animations, toast notifications | Keep accessibility in mind; avoid excessive motion. |
| Timers | `Timer.scheduledTimer` | `setInterval`, Page Visibility API | Persist remaining seconds; pause/resume on visibility changes. |
| Haptics timing on timer end | Haptic + system sound | Web Notifications (permissioned) + vibration pattern (if supported) | Optional; gated by permissions and reduced-motion. |
| Background tasks | N/A | Background Sync (workbox-background-sync) | For queued mutations only; timers do not run in background. |
| Charts | Swift Charts | Recharts | Equivalent line/area/bar charts. |
| Navigation | `NavigationStack`, `TabView` | TanStack Router + bottom-nav component | Preserve 5-tab structure. |

Roadmap addenda
- Health metrics import via Apple Shortcuts export or CSV upload
- Optional PWA Notifications for rest timer completion using Web Notifications API

Non-1:1 mappings called out in risks section of [00-Audit.md](./00-Audit.md).


