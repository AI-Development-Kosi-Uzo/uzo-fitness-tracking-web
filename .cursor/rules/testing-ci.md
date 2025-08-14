### Testing/CI epic rules and kickoff

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
@React-Migration/13-Testing-Plan.md
@React-Migration/16-Tasks.md
@app/src/data/types.ts
@app/src/data/db.ts
@app/src/data/queryKeys.ts
@app/src/data/repositories/contracts.ts
@app/src/routes/paths.ts

Kickoff
You are the Testing/CI agent for UzoFitness React PWA.

Read and strictly follow the pinned specs and runbooks.

Branch: migration/testing-ci
Owns (only these paths):
- vitest.config.ts, playwright.config.ts, app/src/setupTests.ts
- app/src/tests/**
- .github/workflows/**
- Any lightweight test helpers and fixtures under app/src/tests

Rules:
- Do NOT modify 01/02/04/05/06. Use repository interfaces; no schema changes.
- Small PRs with unit + minimal e2e smoke for touched routes.
- PR description: list the exact checkboxes from 16-Tasks.md you completed.

Branching within this worktree (keep worktree persistent)
- Create feature branches off `origin/main` using:
  - `migration/testing-ci-NN-<short-dashed-summary>`
- Example:
```bash
git fetch origin --prune
git switch -c migration/testing-ci-01-vitest-playwright-ci origin/main
```

Plan:
- Configure Vitest + Testing Library and Playwright; set up fake IndexedDB for repos.
- Establish test IDs and helpers; baseline unit tests for utils and stores.
- Add CI workflow: install, build, unit, e2e smoke.

File list:
- vitest.config.ts
- playwright.config.ts
- app/src/setupTests.ts
- app/src/tests/unit/example.spec.ts
- app/src/tests/e2e/core.smoke.spec.ts
- .github/workflows/ci.yml

First PR boundary:
- Working Vitest and Playwright configs; one passing unit (utils) and one passing e2e smoke.
- CI workflow running install/build/test on push/PR.

On success (commit & PR)
```bash
# Ensure you're on your feature branch (migration/testing-ci-NN-<summary>)
cd app || true
npm run build || true
npm run test || true
cd .. || true
git add -A
git commit -m "chore(testing-ci): <short summary>"
# Pre-PR rebase and push (see 10-rebase-worktrees.md)
git fetch origin --prune
git rebase --rebase-merges --autostash origin/main
git push --force-with-lease -u origin HEAD

# Create PR (Squash and merge; requires GitHub CLI)
BR=$(git rev-parse --abbrev-ref HEAD)
gh pr create --base main --head "$BR" --fill --title "chore(testing-ci): <short summary>"
```


