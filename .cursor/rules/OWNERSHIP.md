# Ownership and Edit Boundaries

Edit only within your ownership paths. Do not change contracts unless authorized via Data/Core ADR.

Agents → paths:
- Agent A — Foundation & CI
  - `app/index.html`, root build/test configs, `.github/workflows/**`, Vercel config
- Agent B — Data Layer & Contracts
  - `React-Migration/01-Domain-Models.yml`, `app/src/data/**/*` (types, db, repositories), env wiring
- Agent C — Routing & Shell
  - `app/src/main.tsx`, `app/src/routes/root.tsx`, providers, global app shell
- Agent D — Logging Feature
  - `app/src/routes/log/**`, `app/src/components/log/**`, local UI state in `app/src/state` if needed
- Agent E — Library Feature
  - `app/src/routes/library/**`, `app/src/components/library/**`, local UI state in `app/src/state` if needed
- Agent F — History Feature
  - `app/src/routes/history/**`, `app/src/components/history/**`
- Agent G — Progress Feature
  - `app/src/routes/progress/**`, `app/src/components/progress/**`
- Agent H — Settings Feature
  - `app/src/routes/settings/**`, `app/src/components/settings/**`
- Agent P — PWA & Sync
  - `app/public/**`, `app/src/sw/**`, `app/src/data/outbox.ts`, `workbox.config.ts`, SW registration wiring
- Agent T — Testing & QA
  - `vitest.config.ts`, `playwright.config.ts`, `app/src/setupTests.ts`, `app/src/tests/**`, `.github/workflows/**`

Forbidden in UI/routes:
- Direct imports from Dexie or Supabase; use repository interfaces/hooks only

Contracts (protected):
- `React-Migration/01*`, `02*`, `04*`, `05*`, `06*`
- `app/src/data/types.ts`, `app/src/data/db.ts`, `app/src/data/queryKeys.ts`, `app/src/data/repositories/contracts.ts`, `app/src/routes/paths.ts`
