### UzoFitness iOS → React PWA Audit

This document summarizes the current Swift/SwiftUI app and sets the foundation for a mobile-first React + TypeScript PWA migration. Cross-link to specs: [01-Domain-Models.yml](./01-Domain-Models.yml), [02-Feature-Map.md](./02-Feature-Map.md), [05-React-Architecture.md](./05-React-Architecture.md), [06-Data-Layer-Spec.md](./06-Data-Layer-Spec.md), [07-PWA-Spec.md](./07-PWA-Spec.md).

#### High-level summary
- Architecture: SwiftUI + MVVM + SwiftData
- Entry: `UzoFitnessApp` → `MainTabView`
- Tabs/Screens: Logging, Library, History, Progress, Settings
- Persistence: SwiftData (`PersistenceController`); CloudKit set to automatic but not enabled
- Services: `HealthKitManager` (read body mass, body fat), `PhotoService` (Photos authorization, image picking, disk caching, persist `ProgressPhoto`)
- Domains: Workout planning and execution, progress tracking (photos + HealthKit), history analytics, settings/permissions

#### Screen inventory and primary flows
- Logging
  - Purpose: Select active plan/day, create/resume a workout session, log sets/reps/weight, rest timers, superset handling, finish session
  - Root: `LoggingView` → `LoggingViewModel`
  - Subviews/components: `WorkoutSessionView`, `LoggingExerciseRowView`, `SetRowView`, `RestTimerButton`, `RestTimerDurationPicker`, `WorkoutStopwatchView`
  - Notable behaviors: timers (workout and rest), auto-population of planned reps/weight from cached last-used values, superset grouping via `supersetID`, completion gating before finishing

- Library
  - Purpose: Manage `WorkoutTemplate`s and `Exercise` catalog, activate/deactivate `WorkoutPlan`s, import templates from JSON, reorder exercises
  - Root: `LibraryView` → `LibraryViewModel`
  - Subviews/components: `WorkoutsTabView`, `ExercisesTabView`, `ExerciseTemplateEditorView`, `WorkoutTemplateEditorView`, `ExercisePickerView`, `SupersetPickerView`, `TemplateNameInputView`

- History
  - Purpose: View historical `WorkoutSession`s on a calendar, filter by day, show streaks and totals
  - Root: `HistoryView` → `HistoryViewModel`
  - Subviews/components: `CalendarGridView`, `HistorySetRowView`, `WorkoutSessionSimpleCard`, `WorkoutSessionHeaderView`

- Progress
  - Purpose: Visualize trends (max weight, total volume, sessions, reps) and manage progress photos with metadata (angle, date, weight)
  - Root: `ProgressView` → `ProgressViewModel`
  - Subviews/components: `StatsContentView`, `ConsolidatedMetricChart`/`MetricLineChart`, `PicturesContentView`, `PhotoGalleryView`, `PhotoCompareView`, `EditProgressPhotoView`, `ProgressPhotoGrid`, `LocalFileImage`
  - Charts: Swift Charts; migration will use Recharts
  - Integrations: HealthKit for weight/body fat lookups by date
  - Data derivations: `ExerciseTrend` aggregated weekly from `PerformedExercise`; photo metrics mapped per `ProgressPhoto`

- Settings
  - Purpose: Permissions management for HealthKit and Photos
  - Root: `SettingsView` → `SettingsViewModel`

#### Models (SwiftData)
- Core entities: `Exercise`, `WorkoutTemplate`, `DayTemplate`, `ExerciseTemplate`, `WorkoutPlan`, `WorkoutSession`, `SessionExercise`, `CompletedSet`, `PerformedExercise`, `ProgressPhoto`
- Key enums: `ExerciseCategory`, `Weekday`, `PhotoAngle`
- Notable computed properties:
  - `WorkoutSession.totalVolume`
  - `SessionExercise.totalVolume`, `volumeChange`, `volumeChangePercentage`
  - UI adapter: `SessionExerciseUI` for grouped superset display

#### Services and side effects
- HealthKitManager: read latest/day-specific body mass (lbs) and body fat (0–1); DI-friendly via wrapper protocols; used by `ProgressViewModel`
- PhotoService: Photos authorization, library saves, image picker, disk cache to Application Support/ProgressPhotos, persist `ProgressPhoto` via `DataPersistenceServiceProtocol`

#### Navigation and entry
- `UzoFitnessApp` → `MainTabView` with tabs: Log, Library, History, Progress, Settings; `MainTabView` composes `ProgressView` with injected `photoService`, `healthKitManager`, and `modelContext`

#### Dependencies and capabilities
- iOS APIs: SwiftData, Photos, HealthKit, Swift Charts, UIKit haptics/audio in VM
- Entitlements: `UzoFitness.entitlements`, `UzoFitnessDebug.entitlements`
- Build: Xcode 16, iOS 18 target per project rules

#### Risks and web parity
- HealthKit has no web equivalent; propose manual entry and integrations roadmap (Apple Health on web is not available)
- Haptics and system sounds: substitute with subtle UI animations and toasts
- Background timers: constrained on web; rely on foreground timers + Background Sync for queued mutations
- Local persistence: SwiftData → IndexedDB (Dexie) with careful indexing for performance on mobile
- Photos: use Media Capture and File System APIs; server-side storage (Supabase Storage) optional

#### Non-trivial behaviors to preserve
- Auto-population of planned reps/weight from `Exercise` cached fields
- Superset grouping by shared `supersetID` with head detection and traversal
- Workout and rest timers with countdown, completion signal, and auto-advance
- Session finish flow: compute `duration`, convert to `PerformedExercise` history records, batch-update exercise caches

See: [01-Domain-Models.yml](./01-Domain-Models.yml), [02-Feature-Map.md](./02-Feature-Map.md) for route mappings and schema.


