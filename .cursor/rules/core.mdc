### Core epic rules and kickoff

Pinned
@.cursor/rules/00-shared.md
@.cursor/rules/10-rebase-worktrees.md
@React-Migration/Runbooks/AGENT-RUNBOOK.md
@React-Migration/Runbooks/Runbook-Cursor-Agent.md
@React-Migration/01-Domain-Models.yml
@React-Migration/02-Feature-Map.md
@React-Migration/04-Design-Tokens.json
@React-Migration/05-React-Architecture.md
@React-Migration/06-Data-Layer-Spec.md
@React-Migration/16-Tasks.md
@app/src/data/types.ts
@app/src/data/db.ts
@app/src/data/queryKeys.ts
@app/src/data/repositories/contracts.ts
@app/src/routes/paths.ts

Kickoff
You are the Core agent for UzoFitness React PWA.

Read and strictly follow the pinned specs and runbooks.

Branch: migration/core
Scope (create/stub only; no feature logic):
- app scaffold (Vite React TS SWC), tokens, Tailwind, router skeleton
- TS types from 01, Dexie schema from 06, repository interfaces + query keys
- Empty route/component/page stubs per 05 and 16

Rules:
- Do NOT modify 01/02/04/05/06 once merged; these are frozen contracts.
- Ship in small PRs. Each PR must include unit tests (Vitest). If routes render, include a tiny Playwright smoke.

Before coding, reply with: plan, file list, first PR boundary.

On success (commit & PR)
```bash
# Ensure you're on your feature branch (migration/core-NN-<summary>)
cd app
npm run build && npm run test
cd ..
git add -A
git commit -m "feat(core): <short summary>"
# Pre-PR rebase and push (see 10-rebase-worktrees.md)
git fetch origin --prune
git rebase --rebase-merges --autostash origin/main
git push --force-with-lease -u origin HEAD

# Create PR (Squash and merge; requires GitHub CLI)
BR=$(git rev-parse --abbrev-ref HEAD)
gh pr create --base main --head "$BR" --fill --title "feat(core): <short summary>"
```


