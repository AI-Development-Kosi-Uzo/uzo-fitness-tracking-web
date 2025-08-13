### Runbook (Agent): Execute Migration in Claude Code

Follow these steps exactly. Treat Docs/React-Migration as the source of truth. Also consult the master agent runbook: [./AGENT-RUNBOOK.md](./AGENT-RUNBOOK.md)

#### 1) Load specs
- 00-Audit.md, 01-Domain-Models.yml, 02-Feature-Map.md, 04-Design-Tokens.json, 05-React-Architecture.md, 06-Data-Layer-Spec.md, 07-PWA-Spec.md, 09-Component-Specs/README.md, 16-Tasks.md

#### 2) If Core
- Create `app/` scaffold (Vite React TS SWC); install packages per Docs/React-Migration/Runbooks/AGENT-RUNBOOK.md
- Add tokens, router skeleton, TS types, Dexie schema, repo interfaces (mock)
- Push to `migration/core`; open PR

#### 3) If Feature agent
- Checkout `migration/<epic>`
- Implement only files listed in `16-Tasks.md` for that epic
- Use repository interfaces; do not alter contracts
- Add unit tests (Vitest) and smoke e2e (Playwright)
- Open small PRs linking to completed checkboxes

#### 4) Implementation hints
- Timers: use `setInterval`, pause on hidden, resume on visible; persist remaining seconds in store
- Superset grouping: group by `supersetId`, ordered by `position` (see Logging spec)
- Trends: aggregate performedExercises by week; compute totals and max weight
- Photos: use `<input type=file>`; store file name in DB; generate object URLs for display

#### 5) Before PR
- Run `npm run test` and Playwright e2e for affected routes
- Confirm no edits to contract files

Escalation
- Propose contract changes as a separate PR to `migration/core` only, with a brief rationale.

Quick links
- Master agent runbook: [./AGENT-RUNBOOK.md](./AGENT-RUNBOOK.md)
- Tasks: [../16-Tasks.md](../16-Tasks.md)
- Architecture: [../05-React-Architecture.md](../05-React-Architecture.md)


