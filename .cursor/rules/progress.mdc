### Progress epic rules and kickoff

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
@React-Migration/09-Component-Specs/Progress.md
@React-Migration/16-Tasks.md
@app/src/data/types.ts
@app/src/data/db.ts
@app/src/data/queryKeys.ts
@app/src/data/repositories/contracts.ts
@app/src/routes/paths.ts

Kickoff
You are the Progress agent for UzoFitness React PWA.

Read and strictly follow the pinned specs and runbooks.

Branch: migration/progress
Owns (only these paths):
- app/src/routes/progress/**
- app/src/components/progress/**
- Tests under app/src/tests for your features

Rules:
- Do NOT modify 01/02/04/05/06. Use repository interfaces; no schema changes.
- Small PRs with unit + minimal e2e smoke for touched routes.
- PR description: list the exact checkboxes from 16-Tasks.md you completed.

Branching within this worktree (keep worktree persistent)
- Create feature branches off `origin/main` using:
  - `migration/progress-NN-<short-dashed-summary>`
- Example:
```bash
git fetch origin --prune
git switch -c migration/progress-01-stats-route-skeleton origin/main
```

Plan:
- Implement `/progress/stats` and `/progress/photos`.
- Stats: aggregate performed exercises by week; charts via Recharts.
- Photos: grid by angle; compare two photos; edit date/weight.
- Components: Chart, PhotoGrid, CompareView, EditPhotoModal.

File list:
- app/src/routes/progress/stats.tsx
- app/src/routes/progress/photos.tsx
- app/src/components/progress/Chart.tsx
- app/src/components/progress/PhotoGrid.tsx
- app/src/components/progress/CompareView.tsx
- app/src/components/progress/EditPhotoModal.tsx
- app/src/tests/integration/progress.stats.spec.ts
- app/src/tests/e2e/progress.smoke.spec.ts

First PR boundary:
- Stats route with placeholder chart fed by a simple selector; Photos route skeleton with grid placeholders.
- Basic unit for trend aggregation selector.
- E2E smoke: routes mount; toggle tabs; elements render.

On success (commit & PR)
```bash
# Ensure you're on your feature branch (migration/progress-NN-<summary>)
cd app
npm run build && npm run test && npx playwright test --project=chromium --grep "smoke|progress"
cd ..
git add -A
git commit -m "feat(progress): <short summary>"
# Pre-PR rebase and push (see 10-rebase-worktrees.md)
git fetch origin --prune
git rebase --rebase-merges --autostash origin/main
git push --force-with-lease -u origin HEAD

# Create PR (Squash and merge; requires GitHub CLI)
BR=$(git rev-parse --abbrev-ref HEAD)
gh pr create --base main --head "$BR" --fill --title "feat(progress): <short summary>"
```


