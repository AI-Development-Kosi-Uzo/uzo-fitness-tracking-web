### Runbook (Human): Orchestrate Parallel Migration in Claude Code

Claude Code can run multiple tasks across side-by-side threads/workspaces. Use this to coordinate epics.

#### 0) Contracts freeze
- Same as Cursor: protect [01], [02], [04], [05], [06]. Also reference the master runbook: [./AGENT-RUNBOOK.md](./AGENT-RUNBOOK.md)

#### 1) Workspaces & branches
- Create one Claude Code workspace per epic or one workspace with multiple threads
- Branch names: `migration/core`, `migration/logging`, `migration/library`, `migration/history`, `migration/progress`, `migration/pwa-infra`, `migration/testing-ci`

#### 2) Kickoff instructions per thread
Paste this at the top of each thread:
```markdown
You are implementing <EPIC> for UzoFitness React PWA.
Branch: migration/<epic>
Files to own: see Docs/React-Migration/16-Tasks.md and 05-React-Architecture.md.
Contracts are frozen: 01,02,04,05,06. Do not change them.
Output small PRs; include tests and reference the exact checkboxes in 16-Tasks.md.
```

Core thread kickoff (Claude Code)
```markdown
You are the Core agent for UzoFitness React PWA.

Read and strictly follow:
- Master runbook: Docs/React-Migration/Runbooks/AGENT-RUNBOOK.md
- Platform runbook: Docs/React-Migration/Runbooks/Runbook-Claude-Agent.md
- Contracts: Docs/React-Migration/{01-Domain-Models.yml,02-Feature-Map.md,04-Design-Tokens.json,05-React-Architecture.md,06-Data-Layer-Spec.md}
- Tasks: Docs/React-Migration/16-Tasks.md

Branch: migration/core
Scope (create/stub only; no feature logic):
- app scaffold (Vite React TS SWC), tokens, Tailwind, router skeleton
- TS types from 01, Dexie schema from 06, repository interfaces + query keys
- Empty route/component/page stubs per 05 and 16

Rules:
- Do NOT modify 01/02/04/05/06 once merged; these are frozen contracts.
- Small PRs. Include unit tests (Vitest) and tiny Playwright smoke if a route renders.

Before coding, reply with: plan, file list, first PR boundary.
```

Feature thread kickoff (Claude Code)
```markdown
You are the <EPIC> agent for UzoFitness React PWA.

Read and strictly follow:
- Master runbook: Docs/React-Migration/Runbooks/AGENT-RUNBOOK.md
- Platform runbook: Docs/React-Migration/Runbooks/Runbook-Claude-Agent.md
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

#### 3) Core first
- In `migration/core`: scaffold app, tokens, router skeleton, types, Dexie schema, repo interfaces (mocked). Open PR and have others rebase.

#### 4) Reviews and merges
- Require unit + e2e smoke per PR
- If contracts need a change, request a separate `migration/core` PR and broadcast to all threads

#### 5) Ownership and CODEOWNERS
- data/: Core
- state/: Core (except local UI stores)
- routes/log, components/log: Logging
- routes/library, components/library: Library
- routes/history, components/history: History
- routes/progress, components/progress: Progress
- sw/, data/outbox.ts: PWA/Infra

#### 6) Definition of done
- All `16-Tasks.md` items checked, PWA installable, smoke tests green, deployed

Quick links
- Master agent runbook: [./AGENT-RUNBOOK.md](./AGENT-RUNBOOK.md)
- Platform agent runbook (Claude): [Runbook-Claude-Agent.md](./Runbook-Claude-Agent.md)
- Tasks: [../16-Tasks.md](../16-Tasks.md)
- Architecture: [../05-React-Architecture.md](../05-React-Architecture.md)


