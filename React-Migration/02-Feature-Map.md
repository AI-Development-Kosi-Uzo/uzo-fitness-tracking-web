### Feature Map and Routes

This maps current flows to a mobile-first React PWA using TanStack Router, Zustand, and React Query.

#### User journeys
- Template creation (Library)
  - Create/edit/delete `WorkoutTemplate`, manage `DayTemplate` and `ExerciseTemplate`, reorder by `position`, set supersets via `supersetId`
- Workout execution (Logging)
  - Select active plan and weekday, create/resume `WorkoutSession`, auto-populate planned values, log sets, use rest timers, finish session → create `PerformedExercise`
- History
  - Calendar view of `WorkoutSession`s, filter by day, show streaks and totals
- Progress
  - Stats: trends (max weight, total volume, sessions, total reps)
  - Photos: upload, grid by `angle`, compare two photos, annotate date and manual weight
- Settings
  - Manage HealthKit and Photos permissions (web equivalents provided)

#### React routes (TanStack Router)
- `/` → redirects to `/log`
- `/log`
  - `/log/session` (modal or subroute for active session)
- `/library`
  - `/library/templates/:templateId`
  - `/library/exercises`
- `/history`
- `/progress`
  - `/progress/stats`
  - `/progress/photos`
- `/settings`

Route data loaders
- Query keys scoped per route, hydrated from Dexie on mount
- Invalidate on mutations (e.g., finish session invalidates sessions, performedExercises, exercise caches)

#### Navigation flow chart (text)
Tabs: Log ↔ Library ↔ History ↔ Progress ↔ Settings
- Log → Session modal (start/resume) → Finish → History updated and caches updated
- Library → Template detail → Edit days/exercises → Activate plan → Log
- Progress → Stats/Photos segmented control → Compare photos

#### State + Data ownership
- Local UI state (Zustand): timers, selection, modal visibility, segment pickers
- Async/server state (React Query): entities (plans, sessions, exercises, photos), cached in IndexedDB
- Derived client computations: totalVolume, volumeChange, streaks (selectors/utilities)

See: [05-React-Architecture.md](./05-React-Architecture.md), [06-Data-Layer-Spec.md](./06-Data-Layer-Spec.md)


