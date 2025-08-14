### Task Plan (Epics → Tasks)

- [x] [ARCH] Initialize project scaffold (Vite + React 18 + TS + SWC + Tailwind)
  - [x] Create `app/` with `src/` structure, tokens CSS, Tailwind config
  - [x] Add TanStack Router, Zustand, React Query, RHF, Zod, Dexie, Recharts, Workbox
  - [x] Files: `app/index.html`, `app/src/main.tsx`, `app/src/styles/tokens.css`, `tailwind.config.js`, `postcss.config.js`, `vite.config.ts`

- [x] [DATA] Implement Dexie schema and repositories
  - [x] Define types from `01-Domain-Models.yml`
  - [x] Create tables and indexes; write CRUD repos (in-memory repos implemented; Dexie tables defined)
  - [x] Seed sample data for dev (in-memory repos seeded for exercises/sessions/sets)
  - [x] Files: `app/src/data/types.ts`, `app/src/data/db.ts`, `app/src/data/repositories/*.ts`, `app/src/data/seed.ts`
  - [x] Wire repository instances for app use: `app/src/data/repositories/instances.ts`

- [x] [STATE] Create Zustand stores
  - [x] Timers store (workout/rest) with visibility pause
  - [x] UI store for modals and segmented states
  - [x] Files: `app/src/state/timers.store.ts`, `app/src/state/ui.store.ts`

- [x] [ROUTES] Implement routes and layouts
  - [x] Root + bottom nav
  - [x] `/log` basic page: start/resume today session; shows active plan
  - [x] SessionModal (rest timers/supersets) for `/log`
  - [x] `/log/session` minimal logger UI: list session exercises; add/toggle sets; finish gating
  - [x] `/library` + template editor + exercises
  - [x] `/history`
  - [x] `/progress/stats` + `/progress/photos`
  - [x] `/settings`
  - [x] Files: `app/src/routes/root.tsx`, `app/src/routes/log/index.tsx`, `app/src/routes/log/session.tsx`, `app/src/routes/library/index.tsx`, `app/src/routes/library/template.$id.tsx`, `app/src/routes/library/exercises.tsx`, `app/src/routes/history/index.tsx`, `app/src/routes/progress/stats.tsx`, `app/src/routes/progress/photos.tsx`, `app/src/routes/settings/index.tsx`

- [x] [UI] Build components
  - [x] ExerciseRow, SetRow, RestTimerButton, RestTimerPicker, SessionHeader
  - [x] TemplateEditor, DayList, ExerciseTemplateRow, ExercisePicker
  - [x] Calendar, SessionList
  - [x] Chart components, PhotoGrid, CompareView, EditPhotoModal
  - [x] Files: `app/src/components/log/{ExerciseRow.tsx,SetRow.tsx,RestTimerButton.tsx,RestTimerPicker.tsx,SessionHeader.tsx}`
  - [x] Files: `app/src/components/library/{TemplateEditor.tsx,DayList.tsx,ExerciseTemplateRow.tsx,ExercisePicker.tsx}`
  - [x] Files: `app/src/components/history/{Calendar.tsx,SessionList.tsx}`
  - [x] Files: `app/src/components/progress/{Chart.tsx,PhotoGrid.tsx,CompareView.tsx,EditPhotoModal.tsx}`

- [x] [SYNC] PWA SW and background sync
  - [x] Workbox config; mutation outbox + sync
  - [x] Files: `workbox.config.ts`, `app/src/sw/sw.ts`, `app/src/data/outbox.ts`

- [x] [SYNC-SUPABASE] Local Supabase setup and adapters
  - [x] Initialize CLI project, start local stack: `supabase init`, `supabase start`
  - [x] Create migration and paste SQL from `10-API-Contracts.md`; apply with `supabase db reset`
  - [x] Add env: `app/.env.local` with local URL/key
  - [x] Create `app/src/data/supabaseClient.ts` and remote repositories mirroring local repos

- [x] [TEST] Testing setup
  - [x] Vitest unit tests for utils and stores
  - [x] Playwright e2e for core flows
  - [x] Files: `vitest.config.ts`, `playwright.config.ts`, `app/src/tests/unit/*.spec.ts`, `app/src/tests/e2e/core.spec.ts`

- [x] [DEPLOY] CI/CD
  - [x] GitHub Actions build/test
  - [x] Vercel deployment
  - [x] Files: `.github/workflows/ci.yml`, `vercel.json`

References
- See docs in this folder, esp. `05-React-Architecture.md`, `06-Data-Layer-Spec.md`, `07-PWA-Spec.md`.


