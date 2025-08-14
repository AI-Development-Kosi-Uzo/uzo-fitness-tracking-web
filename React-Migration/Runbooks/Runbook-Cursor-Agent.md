### Runbook (Agent): Execute Migration in Cursor

Follow this strictly. Do not change contracts without approval. Also consult the master agent runbook: [./AGENT-RUNBOOK.md](./AGENT-RUNBOOK.md)

#### 1) Read and cache contracts
- 00 Audit: ../00-Audit.md
- Models: ../01-Domain-Models.yml
- Routes: ../02-Feature-Map.md
- Tokens: ../04-Design-Tokens.json
- Architecture: ../05-React-Architecture.md
- Data layer: ../06-Data-Layer-Spec.md
- PWA: ../07-PWA-Spec.md
- Components: ../09-Component-Specs/README.md
- Tasks: ../16-Tasks.md

#### 2) If Core agent
- Scaffold Vite app in `app/`; install deps (see Docs/React-Migration/Runbooks/AGENT-RUNBOOK.md)
- Create files and empty stubs per `16-Tasks.md` “ARCH” and “DATA”
- Add TS types and Dexie schema; implement repository interfaces with mock data
- Push branch `migration/core`; open PR

#### 3) If Feature agent (Logging/Library/History/Progress/PWA/Testing)
- Checkout branch `migration/<epic>`
- Implement only files listed for your epic in `16-Tasks.md`
- Use repositories and types; do not modify contracts
- Add unit tests (Vitest) and route smoke (Playwright) for your changes
- Open small PRs; mention which checkboxes you’re completing

#### 4) Coding rules
- File paths must match `05-React-Architecture.md` and `16-Tasks.md`
- No ad-hoc deps; request additions via PR notes
- Keep components small and testable; wire handlers via props
- Zustand for local UI state only; async data via React Query hooks

#### 5) Timers and visibility
- Use `document.visibilityState` to pause intervals
- Persist remaining seconds to store

#### 6) Data operations
- Read via repo hooks (React Query)
- Mutations enqueue to outbox when offline; optimistic update UI; invalidate queries on success

#### 7) PWA specifics
- Register Workbox SW; precache shell; configure background sync tag `uzofitness-sync`

#### 8) Tests to run before PR
- `npm run test` (Vitest)
- `npx playwright test` (or project script)

#### 9) PR checklist
- [ ] No contract file edits
- [ ] Files placed under the agreed paths
- [ ] Unit and e2e tests included/passing for changed routes
- [ ] 16-Tasks.md items updated in description

Escalations
- If a contract change is needed, open an issue and propose a focused PR targeting `migration/core` only.

Quick links
- Master agent runbook: [./AGENT-RUNBOOK.md](./AGENT-RUNBOOK.md)
- Tasks: [../16-Tasks.md](../16-Tasks.md)
- Architecture: [../05-React-Architecture.md](../05-React-Architecture.md)

#### Ownership quick map
- Data: Agent B (`app/src/data/**/*`)
- Routes/Shell: Agent C (`app/src/routes/**/*`, `app/src/main.tsx`)
- Logging: Agent D; Library: Agent E; History: Agent F; Progress: Agent G; Settings: Agent H
- Shared UI: Agent E/A (`app/src/components/shared/**/*`, `app/src/styles/**/*`)

#### Parallelization rules
- Only edit within your ownership areas
- Do not import data implementations into routes/components; use exposed interfaces/hooks
- Rebase from `main` daily; resolve conflicts locally before PR
- Keep PRs small and scoped; include tests for changed code

#### Branch naming
- `feat/<area>-<task>` (e.g., `feat/progress-photos-grid`)

#### PR checklist (must pass)
- [ ] Typecheck, lint, unit, e2e smoke green
- [ ] No forbidden imports or cross-feature coupling
- [ ] Contracts unchanged (or ADR linked if changed by Agent B)


