### Task Plan (Epics → Tasks)

- [ ] [ARCH] Initialize project scaffold (Vite + React 18 + TS + SWC + Tailwind)
  - [x] Create `app/` with `src/` structure, tokens CSS, Tailwind config
  - [ ] Add Zustand, React Query, RHF, Zod, Recharts, Workbox
  - [x] Add TanStack Router, Dexie
  - [x] Files: `app/index.html`, `app/src/main.tsx`, `app/src/styles/tokens.css`, `tailwind.config.js`, `postcss.config.js`, `vite.config.ts`

- [ ] [DATA] Implement Dexie schema and repositories
  - [x] Define types from `01-Domain-Models.yml`
  - [x] Create tables and indexes; write CRUD repos (memory repos in place)
  - [ ] Seed sample data for dev
  - [x] Files: `app/src/data/types.ts`, `app/src/data/db.ts`, `app/src/data/repositories/*.ts`
  - [ ] Files: `app/src/data/seed.ts`

- [ ] [STATE] Create Zustand stores
  - [x] Timers store (workout/rest) with visibility pause (stub)
  - [x] UI store for modals and segmented states (stub)
  - [x] Files: `app/src/state/timers.store.ts`, `app/src/state/ui.store.ts`

- [ ] [ROUTES] Implement routes and layouts
  - [x] Base router and redirect to `/log`
  - [x] Root + bottom nav
  - [x] `/log` + SessionModal (stub page + session page)
  - [x] `/library` + template editor + exercises (stub pages)
  - [x] `/history` (stub page)
  - [x] `/progress/stats` + `/progress/photos` (stub pages)
  - [x] `/settings` (stub page)
  - [x] Files: `app/src/routes/root.tsx`, `app/src/routes/log/index.tsx`, `app/src/routes/log/session.tsx`, `app/src/routes/library/index.tsx`, `app/src/routes/library/template.$id.tsx`, `app/src/routes/library/exercises.tsx`, `app/src/routes/history/index.tsx`, `app/src/routes/progress/stats.tsx`, `app/src/routes/progress/photos.tsx`, `app/src/routes/settings/index.tsx`

- [ ] [UI] Build components
  - [ ] ExerciseRow, SetRow, RestTimerButton, RestTimerPicker, SessionHeader
  - [ ] TemplateEditor, DayList, ExerciseTemplateRow, ExercisePicker
  - [ ] Calendar, SessionList
  - [ ] Chart components, PhotoGrid, CompareView, EditPhotoModal
  - [ ] Files: `app/src/components/log/{ExerciseRow.tsx,SetRow.tsx,RestTimerButton.tsx,RestTimerPicker.tsx,SessionHeader.tsx}`
  - [ ] Files: `app/src/components/library/{TemplateEditor.tsx,DayList.tsx,ExerciseTemplateRow.tsx,ExercisePicker.tsx}`
  - [ ] Files: `app/src/components/history/{Calendar.tsx,SessionList.tsx}`
  - [ ] Files: `app/src/components/progress/{Chart.tsx,PhotoGrid.tsx,CompareView.tsx,EditPhotoModal.tsx}`

- [ ] [SYNC] PWA SW and background sync
  - [x] Workbox config (stub only)
  - [x] Files: `workbox.config.ts`, `app/src/sw/sw.ts`
  - [ ] Files: `app/src/data/outbox.ts` (pending)

- [ ] [SYNC-SUPABASE] Local Supabase setup and adapters
  - [ ] Initialize CLI project, start local stack: `supabase init`, `supabase start`
  - [ ] Create migration and paste SQL from `10-API-Contracts.md`; apply with `supabase db reset`
  - [ ] Add env: `app/.env.local` with local URL/key
  - [ ] Create `app/src/data/supabaseClient.ts` and remote repositories mirroring local repos

- [ ] [TEST] Testing setup
  - [ ] Vitest unit tests for utils and stores
  - [x] Playwright e2e smoke in place
  - [x] Files: `vitest.config.ts`, `playwright.config.ts`
  - [x] Files: `app/src/tests/e2e/smoke.spec.ts`

- [ ] [DEPLOY] CI/CD
  - [x] GitHub Actions build/test
  - [ ] Vercel deployment
  - [x] Files: `.github/workflows/ci.yml`, `vercel.json`

References
- See docs in this folder, esp. `05-React-Architecture.md`, `06-Data-Layer-Spec.md`, `07-PWA-Spec.md`.

### Parallel Workstreams & Agent Ownership

- Agent A — Foundation & CI (owns: root configs, `app/index.html`, build/test configs)
- Agent B — Data Layer & Contracts (owns: `app/src/data/**/*`, `01-Domain-Models.yml` alignment)
- Agent C — Routing & Shell (owns: `app/src/routes/root.tsx`, providers in `app/src/main.tsx`)
- Agent D — Logging Feature (owns: `app/src/routes/log/**/*`, `app/src/components/log/**/*`)
- Agent E — Library Feature (owns: `app/src/routes/library/**/*`, `app/src/components/library/**/*`)
- Agent F — History Feature (owns: `app/src/routes/history/**/*`, `app/src/components/history/**/*`)
- Agent G — Progress Feature (owns: `app/src/routes/progress/**/*`, `app/src/components/progress/**/*`)
- Agent H — Settings Feature (owns: `app/src/routes/settings/**/*`)
- Agent P — PWA & Sync (owns: `app/sw/**/*`, Workbox/Vite PWA config)
- Agent T — Testing & QA (owns: test infra, Playwright/Vitest suites)

Rules
- Do not modify areas owned by another agent.
- UI/Routes may only import data via repository interfaces; no direct Dexie/Supabase from routes/components.
- Contract/interface changes must be proposed by Agent B with a small ADR and a short freeze window announcement.
- Short-lived branches: `feat/<area>-<task>`; rebase daily onto `main` to reduce conflicts.

---


