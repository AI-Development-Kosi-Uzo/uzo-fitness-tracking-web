### Logging epic rules and kickoff

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
@React-Migration/09-Component-Specs/Logging.md
@React-Migration/16-Tasks.md
@app/src/data/types.ts
@app/src/data/db.ts
@app/src/data/queryKeys.ts
@app/src/data/repositories/contracts.ts
@app/src/routes/paths.ts

Kickoff
You are the Logging agent for UzoFitness React PWA.

Read and strictly follow the pinned specs and runbooks.

Branch: migration/logging
Owns (only these paths):
- app/src/routes/log/**
- app/src/components/log/**
- app/src/state (only local UI stores if needed)
- Tests under app/src/tests for your features

Rules:
- Do NOT modify 01/02/04/05/06. Use repository interfaces; no schema changes.
- Small PRs with unit + minimal e2e smoke for touched routes.
- PR description: list the exact checkboxes from 16-Tasks.md you completed.

Branching within this worktree (keep worktree persistent)
- Create feature branches off `origin/main` using:
  - `migration/logging-NN-<short-dashed-summary>`
- Example:
```bash
git fetch origin --prune
git switch -c migration/logging-01-start-session-route-stubs origin/main
```

Plan:
- Implement `/log` and `/log/session` pages with TanStack Router.
- Wire repositories for active plan, today’s session, session exercises, and completed sets; keep local-first with Dexie.
- Add Zustand timers store (workout/rest) with visibility pause.
- Build components: ExerciseRow, SetRow, RestTimerButton, RestTimerPicker, SessionHeader.
- Finish session pipeline: validate completion, create performed exercises, invalidate queries.

File list:
- app/src/routes/log/index.tsx
- app/src/routes/log/session.tsx
- app/src/components/log/ExerciseRow.tsx
- app/src/components/log/SetRow.tsx
- app/src/components/log/RestTimerButton.tsx
- app/src/components/log/RestTimerPicker.tsx
- app/src/components/log/SessionHeader.tsx
- app/src/state/timers.store.ts
- app/src/tests/unit/timers.store.spec.ts
- app/src/tests/e2e/logging.smoke.spec.ts

First PR boundary:
- Route stubs for `/log` and `/log/session` rendering skeleton lists and a disabled “Start Session” button.
- Add `timers.store.ts` with basic start/pause/tick and a unit test.
- E2E smoke: page mounts, route navigates, key elements present.

On success (commit & PR)
```bash
# Ensure you're on your feature branch (migration/logging-NN-<summary>)
cd app
npm run build && npm run test && npx playwright test --project=chromium --grep "smoke|logging"
cd ..
git add -A
git commit -m "feat(logging): <short summary>"
# Pre-PR rebase and push (see 10-rebase-worktrees.md)
git fetch origin --prune
git rebase --rebase-merges --autostash origin/main
git push --force-with-lease -u origin HEAD

# Create PR (Squash and merge; requires GitHub CLI)
BR=$(git rev-parse --abbrev-ref HEAD)
gh pr create --base main --head "$BR" --fill --title "feat(logging): <short summary>"
```


