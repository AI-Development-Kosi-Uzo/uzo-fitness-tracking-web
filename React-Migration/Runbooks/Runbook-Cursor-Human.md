### Runbook (Human): Orchestrate Parallel Migration in Cursor

This guide helps you coordinate multiple agents in Cursor to implement the React PWA in parallel while avoiding conflicts.

#### 0) Read and decide
- Read: [AGENT-RUNBOOK.md](./AGENT-RUNBOOK.md) (master runbook for all agents)
- Freeze contracts: [01-Domain-Models.yml](../01-Domain-Models.yml), [06-Data-Layer-Spec.md](../06-Data-Layer-Spec.md), [02-Feature-Map.md](../02-Feature-Map.md), [04-Design-Tokens.json](../04-Design-Tokens.json), [05-React-Architecture.md](../05-React-Architecture.md)
- Decide now if Supabase sync is in-scope for MVP (see [10-API-Contracts.md](../10-API-Contracts.md))

#### Sequential steps (exact order for a separate migration repo)
1. Create Core branch and bring specs into the repo
   - Copy the entire `Docs/React-Migration/` folder (including `Runbooks/AGENT-RUNBOOK.md`) to the root of your migration repo
   - Create branch:
   ```bash
   git checkout -b migration/core
   ```

2. Scaffold the PWA in `app/`
   - Follow `Runbooks/AGENT-RUNBOOK.md` to scaffold:
   ```bash
   npm create vite@latest app -- --template react-swc-ts
   cd app && npm install
   npx tailwindcss init -p
   ```
   - Add tokens: create `app/src/styles/tokens.css` with CSS variables from `04-Design-Tokens.json` and import it in `app/src/main.tsx`

3. Implement "contracts in code" (no feature logic)
   - From `01-Domain-Models.yml`: create `app/src/data/types.ts`
   - From `06-Data-Layer-Spec.md`: create `app/src/data/db.ts` (Dexie tables/indexes)
   - From `02-Feature-Map.md`: create `app/src/routes/paths.ts` (route constants)
   - Stabilize shared surfaces:
     - `app/src/data/queryKeys.ts` (all query keys)
     - `app/src/data/repositories/contracts.ts` (repository interfaces)
   - Optional stubs: `app/src/data/repositories/memory/*.ts` with mock data for early UI

4. Commit Core scaffold and contracts
   ```bash
   git add .
   git commit -m "feat(core): scaffold app and establish contracts v1 (types, db, queryKeys, repo interfaces, route paths)"
   git push -u origin migration/core
   ```

5. Open and merge Core PR (this freezes contracts v1)
   - Open PR `migration/core` → `main` with title "Freeze contracts v1"
   - Merge to `main`

6. Tag the contracts version
   ```bash
   git checkout main
   git pull
   git tag -a contracts-v1 -m "Contracts v1"
   git push origin contracts-v1
   ```

7. Protect the contracts (enforcement)
   - Add CODEOWNERS entries requiring your review for:
     - `Docs/React-Migration/01*`, `02*`, `04*`, `05*`, `06*`
     - `app/src/data/types.ts`, `app/src/data/db.ts`, `app/src/data/queryKeys.ts`, `app/src/data/repositories/contracts.ts`, `app/src/routes/paths.ts`
   - Enable branch protection on `main` (require PR + checks)

8. Create feature branches off updated `main`
   ```bash
   git checkout -b migration/logging
   # similarly: migration/library, migration/history, migration/progress, migration/pwa-infra, migration/testing-ci
   ```

9. Spin up parallel Cursor threads (one per epic)
   - Pin `Runbooks/AGENT-RUNBOOK.md`, contracts, and relevant specs in each thread
   - Post the kickoff template below for Core or Feature threads

10. Merge cadence and rebase
   - Use small PRs per checkbox in `16-Tasks.md`
   - Daily merge window; require feature branches to rebase onto `main`

11. Contract change protocol (if truly needed)
   - Open a tiny Core PR titled "Contracts v2"
   - Upon merge, tag `contracts-v2`, notify all threads to rebase

12. Definition of done
   - All `16-Tasks.md` items checked; PWA installable; offline shell; background sync; core e2e flows green; deployed to Vercel

#### 1) Branching & PR rules
- Trunk-based, short-lived branches:
  - `migration/core`
  - `migration/logging`
  - `migration/library`
  - `migration/history`
  - `migration/progress`
  - `migration/pwa-infra`
  - `migration/testing-ci`
- PR gating:
  - Do not change contracts without a separate PR from `migration/core`
  - Require passing unit tests and e2e smoke on PR
  - Enforce “feature flags” for incomplete routes

#### 2) Cursor workspace setup
- Create a new folder `app/` at repo root (PWA project)
- Open files side-by-side: `Docs/React-Migration/16-Tasks.md`, `Docs/React-Migration/Runbooks/AGENT-RUNBOOK.md`, the epic-specific spec under `Docs/React-Migration/09-Component-Specs/`
- Pin the contracts files in Cursor so agents see them
- Optional: create `Docs/React-Migration/tasks-migration.md` to track live checkboxes (copy items from `16-Tasks.md`)

#### 3) Spin up parallel agent threads in Cursor
- Create one Cursor chat per epic (Logging, Library, History, Progress, PWA/Infra, Testing/CI)
- In each thread, include:
  - Branch name to use
  - Scope of files (folders they own)
  - Links to the relevant docs/specs
  - The rule: “Do not change contracts. If needed, propose a contracts PR to `migration/core`.”

#### Kickoff templates (copy/paste per thread)

Core thread kickoff (post this message)
```markdown
You are the Core agent for UzoFitness React PWA.

Read and strictly follow:
- Master runbook: Docs/React-Migration/Runbooks/AGENT-RUNBOOK.md
- Platform runbook: Docs/React-Migration/Runbooks/Runbook-Cursor-Agent.md
- Contracts: Docs/React-Migration/{01-Domain-Models.yml,02-Feature-Map.md,04-Design-Tokens.json,05-React-Architecture.md,06-Data-Layer-Spec.md}
- Tasks: Docs/React-Migration/16-Tasks.md

Branch: migration/core
Scope (create/stub only; no feature logic):
- app scaffold (Vite React TS SWC), tokens, Tailwind, router skeleton
- TS types from 01, Dexie schema from 06, repository interfaces + query keys
- Empty route/component/page stubs per 05 and 16

Rules:
- Do NOT modify 01/02/04/05/06 once merged; these are frozen contracts.
- Ship in small PRs. Each PR must include unit tests (Vitest). If routes render, include a tiny Playwright smoke.

Before coding, reply with: plan, file list, first PR boundary.
```

Feature thread kickoff (Logging/Library/History/Progress/PWA/Testing)
```markdown
You are the <EPIC> agent for UzoFitness React PWA.

Read and strictly follow:
- Master runbook: Docs/React-Migration/Runbooks/AGENT-RUNBOOK.md
- Platform runbook: Docs/React-Migration/Runbooks/Runbook-Cursor-Agent.md
- Contracts: Docs/React-Migration/{01-Domain-Models.yml,02-Feature-Map.md,04-Design-Tokens.json,05-React-Architecture.md,06-Data-Layer-Spec.md}
- Specs: Docs/React-Migration/09-Component-Specs/<Screen>.md
- Tasks: Docs/React-Migration/16-Tasks.md (only your epic items)

Branch: migration/<epic>
Owns (only these paths):
- app/src/routes/<epic>/**
- app/src/components/<epic>/**
- app/src/state (only local UI stores if needed)
- Tests under app/src/tests for your features

Rules:
- Do NOT modify 01/02/04/05/06. Use repository interfaces; no schema changes.
- Small PRs with unit + minimal e2e smoke for touched routes.
- PR description: list the exact checkboxes from 16-Tasks.md you completed.

Before coding, reply with: plan, file list, first PR boundary.
```

#### 4) Core agent (start first)
- Tasks:
  - Scaffold Vite app (per [AGENT-RUNBOOK.md](./AGENT-RUNBOOK.md))
  - Add tokens/Tailwind, router skeleton, TS types from [01](../01-Domain-Models.yml), Dexie schema from [06](../06-Data-Layer-Spec.md)
  - Create repository interfaces + query keys; stub methods
  - Push branch `migration/core`, open PR, have other branches rebase

#### 5) Execution loop per epic
- Agents open small PRs for each subtask in `16-Tasks.md`
- You review PRs for:
  - Contract adherence, file paths, tests present
  - No unexplained type/schema changes
  - Route-level smoke passes
- Merge window once/twice daily; require rebase to trunk

#### 6) Conflict prevention
- Protect `Docs/React-Migration/01*,02*,04*,05*,06*`
- CODEOWNERS for `app/src/data`, `app/src/state`, `app/src/routes/*`
- If a change to contracts is truly needed: new PR from `migration/core`, notify all threads to rebase

#### 7) Quality gates
- Unit tests must pass (Vitest)
- E2E smoke for changed routes (Playwright)
- Lighthouse/LCP checks for main routes (optional)

#### 8) Definition of done
- All items in [16-Tasks.md](../16-Tasks.md) checked
- PWA installable; offline shell; background sync for mutations
- E2E critical paths green; deploy to Vercel

Quick links
- Master agent runbook: [./AGENT-RUNBOOK.md](./AGENT-RUNBOOK.md)
- Platform agent runbook (Cursor): [Runbook-Cursor-Agent.md](./Runbook-Cursor-Agent.md)
- Tasks: [../16-Tasks.md](../16-Tasks.md)
- Architecture: [../05-React-Architecture.md](../05-React-Architecture.md)
- Data: [../01-Domain-Models.yml](../01-Domain-Models.yml), [../06-Data-Layer-Spec.md](../06-Data-Layer-Spec.md)


