### History epic rules and kickoff

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
@React-Migration/09-Component-Specs/History.md
@React-Migration/16-Tasks.md
@app/src/data/types.ts
@app/src/data/db.ts
@app/src/data/queryKeys.ts
@app/src/data/repositories/contracts.ts
@app/src/routes/paths.ts

Kickoff
You are the History agent for UzoFitness React PWA.

Read and strictly follow the pinned specs and runbooks.

Branch: migration/history
Owns (only these paths):
- app/src/routes/history/**
- app/src/components/history/**
- Tests under app/src/tests for your features

Rules:
- Do NOT modify 01/02/04/05/06. Use repository interfaces; no schema changes.
- Small PRs with unit + minimal e2e smoke for touched routes.
- PR description: list the exact checkboxes from 16-Tasks.md you completed.

Branching within this worktree (keep worktree persistent)
- Create feature branches off `origin/main` using:
  - `migration/history-NN-<short-dashed-summary>`
- Example:
```bash
git fetch origin --prune
git switch -c migration/history-01-calendar-and-session-list origin/main
```

Plan:
- Implement `/history` with calendar grid and per-day session list.
- Compute streaks and totals client-side; invalidate caches on session finish.
- Components: Calendar, SessionList.

File list:
- app/src/routes/history/index.tsx
- app/src/components/history/Calendar.tsx
- app/src/components/history/SessionList.tsx
- app/src/utils/streaks.ts
- app/src/tests/unit/streaks.spec.ts
- app/src/tests/e2e/history.smoke.spec.ts

First PR boundary:
- Calendar and list skeletons wired to `workoutSessions` with loading/empty states.
- Streak utility with unit tests.
- E2E smoke: route mounts; selecting a date filters sessions.

On success (commit & PR)
```bash
# Ensure you're on your feature branch (migration/history-NN-<summary>)
cd app
npm run build && npm run test && npx playwright test --project=chromium --grep "smoke|history"
cd ..
git add -A
git commit -m "feat(history): <short summary>"
# Pre-PR rebase and push (see 10-rebase-worktrees.md)
git fetch origin --prune
git rebase --rebase-merges --autostash origin/main
git push --force-with-lease -u origin HEAD

# Create PR (Squash and merge; requires GitHub CLI)
BR=$(git rev-parse --abbrev-ref HEAD)
gh pr create --base main --head "$BR" --fill --title "feat(history): <short summary>"
```


