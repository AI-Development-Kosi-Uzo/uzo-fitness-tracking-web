# Cursor Rules — UzoFitness

These rules guide parallel agents. They align with `React-Migration/16-Tasks.md` and the runbooks in `React-Migration/Runbooks/*`.

Primary sources:
- Tasks and sequencing: `React-Migration/16-Tasks.md` (Remaining Tasks by Parallel Workstream + Execution order and parallelization)
- Human/Agent runbooks: `React-Migration/Runbooks/Runbook-Cursor-Human.md`, `React-Migration/Runbooks/Runbook-Cursor-Agent.md`, `React-Migration/Runbooks/AGENT-RUNBOOK.md`

Included policies:
- See `OWNERSHIP.md` for edit boundaries
- See `PARALLELIZATION.md` for what can run now vs. what must wait
- See `PR-CHECKLIST.md` for required gates before merging
- See `KICKOFF-TEMPLATES.md` for copy/paste agent kickoffs

General rules:
- Edit only within your ownership paths
- Do not modify contracts unless approved via Data/Core ADR
- UI/Routes must call repository interfaces/hooks only; never import Dexie/Supabase directly
- Keep PRs small; on merge, update checkboxes in `React-Migration/16-Tasks.md` and include the PR number
