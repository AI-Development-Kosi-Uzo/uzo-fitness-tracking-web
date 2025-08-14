### Task Plan (Epics → Tasks)

- [ ] [ARCH] Initialize project scaffold (Vite + React 18 + TS + SWC + Tailwind)
  - [ ] Create `app/` with `src/` structure, tokens CSS, Tailwind config
  - [ ] Add TanStack Router, Zustand, React Query, RHF, Zod, Dexie, Recharts, Workbox
  - [ ] Files: `app/index.html`, `app/src/main.tsx`, `app/src/styles/tokens.css`, `tailwind.config.js`, `postcss.config.js`, `vite.config.ts`

- [ ] [DATA] Implement Dexie schema and repositories
  - [ ] Define types from `01-Domain-Models.yml`
  - [ ] Create tables and indexes; write CRUD repos
  - [ ] Seed sample data for dev
  - [ ] Files: `app/src/data/types.ts`, `app/src/data/db.ts`, `app/src/data/repositories/*.ts`, `app/src/data/seed.ts`

- [ ] [STATE] Create Zustand stores
  - [ ] Timers store (workout/rest) with visibility pause
  - [ ] UI store for modals and segmented states
  - [ ] Files: `app/src/state/timers.store.ts`, `app/src/state/ui.store.ts`

- [ ] [ROUTES] Implement routes and layouts
  - [ ] Root + bottom nav
  - [ ] `/log` + SessionModal
  - [ ] `/library` + template editor + exercises
  - [ ] `/history`
  - [ ] `/progress/stats` + `/progress/photos`
  - [ ] `/settings`
  - [ ] Files: `app/src/routes/root.tsx`, `app/src/routes/log/index.tsx`, `app/src/routes/log/session.tsx`, `app/src/routes/library/index.tsx`, `app/src/routes/library/template.$id.tsx`, `app/src/routes/library/exercises.tsx`, `app/src/routes/history/index.tsx`, `app/src/routes/progress/stats.tsx`, `app/src/routes/progress/photos.tsx`, `app/src/routes/settings/index.tsx`

- [ ] [UI] Build components
  - [ ] ExerciseRow, SetRow, RestTimerButton, RestTimerPicker, SessionHeader
  - [ ] TemplateEditor, DayList, ExerciseTemplateRow, ExercisePicker
  - [ ] Calendar, SessionList
  - [ ] Chart components, PhotoGrid, CompareView, EditPhotoModal
  - [ ] Files: `app/src/components/log/{ExerciseRow.tsx,SetRow.tsx,RestTimerButton.tsx,RestTimerPicker.tsx,SessionHeader.tsx}`
  - [ ] Files: `app/src/components/library/{TemplateEditor.tsx,DayList.tsx,ExerciseTemplateRow.tsx,ExercisePicker.tsx}`
  - [ ] Files: `app/src/components/history/{Calendar.tsx,SessionList.tsx}`
  - [ ] Files: `app/src/components/progress/{Chart.tsx,PhotoGrid.tsx,CompareView.tsx,EditPhotoModal.tsx}`

- [x] [SYNC] PWA SW and background sync
  - [x] Workbox config; mutation outbox + sync (via vite-plugin-pwa generateSW + Workbox backgroundSync)
  - [x] Files: configured in `app/vite.config.ts` and `app/index.html` (no separate sw.ts/outbox needed)

- [ ] [SYNC-SUPABASE] Local Supabase setup and adapters
  - [ ] Initialize CLI project, start local stack: `supabase init`, `supabase start`
  - [ ] Create migration and paste SQL from `10-API-Contracts.md`; apply with `supabase db reset`
  - [ ] Add env: `app/.env.local` with local URL/key
  - [ ] Create `app/src/data/supabaseClient.ts` and remote repositories mirroring local repos

- [ ] [TEST] Testing setup
  - [ ] Vitest unit tests for utils and stores
  - [ ] Playwright e2e for core flows
  - [ ] Files: `vitest.config.ts`, `playwright.config.ts`, `app/src/tests/unit/*.spec.ts`, `app/src/tests/e2e/core.spec.ts`

- [ ] [DEPLOY] CI/CD
  - [ ] GitHub Actions build/test
  - [ ] Vercel deployment
  - [ ] Files: `.github/workflows/ci.yml`, `vercel.json`

References
- See docs in this folder, esp. `05-React-Architecture.md`, `06-Data-Layer-Spec.md`, `07-PWA-Spec.md`.


