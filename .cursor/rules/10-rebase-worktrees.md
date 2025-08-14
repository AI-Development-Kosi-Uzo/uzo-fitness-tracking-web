### Rebase flow with git worktrees (parallel epics)

Initial setup (one time)
```bash
mkdir -p worktrees
git fetch origin --prune --tags

# Main worktree
git worktree add worktrees/main main

# Core and feature worktrees (created as sibling directories outside the main repo)
git worktree add -b migration/core "/Users/kosiuzodinma/Library/Mobile Documents/com~apple~CloudDocs/Documents-Kosi-Mac-mini/AI-Built-Applications/UzoFitnessWeb-core" main || true
git worktree add -b migration/logging "/Users/kosiuzodinma/Library/Mobile Documents/com~apple~CloudDocs/Documents-Kosi-Mac-mini/AI-Built-Applications/UzoFitnessWeb-logging" main || true
git worktree add -b migration/library "/Users/kosiuzodinma/Library/Mobile Documents/com~apple~CloudDocs/Documents-Kosi-Mac-mini/AI-Built-Applications/UzoFitnessWeb-library" main || true
git worktree add -b migration/history "/Users/kosiuzodinma/Library/Mobile Documents/com~apple~CloudDocs/Documents-Kosi-Mac-mini/AI-Built-Applications/UzoFitnessWeb-history" main || true
git worktree add -b migration/progress "/Users/kosiuzodinma/Library/Mobile Documents/com~apple~CloudDocs/Documents-Kosi-Mac-mini/AI-Built-Applications/UzoFitnessWeb-progress" main || true
git worktree add -b migration/settings "/Users/kosiuzodinma/Library/Mobile Documents/com~apple~CloudDocs/Documents-Kosi-Mac-mini/AI-Built-Applications/UzoFitnessWeb-settings" main || true
git worktree add -b migration/pwa-infra "/Users/kosiuzodinma/Library/Mobile Documents/com~apple~CloudDocs/Documents-Kosi-Mac-mini/AI-Built-Applications/UzoFitnessWeb-pwa-infra" main || true
git worktree add -b migration/testing-ci "/Users/kosiuzodinma/Library/Mobile Documents/com~apple~CloudDocs/Documents-Kosi-Mac-mini/AI-Built-Applications/UzoFitnessWeb-testing-ci" main || true
```

Open all epic worktrees in Cursor (helper)
```bash
# Opens each sibling worktree in a new Cursor window
for w in core logging library history progress settings pwa-infra testing-ci; do
  cursor -n "/Users/kosiuzodinma/Library/Mobile Documents/com~apple~CloudDocs/Documents-Kosi-Mac-mini/AI-Built-Applications/UzoFitnessWeb-$w"
done

# Optional: also open the main repo
cursor -n "/Users/kosiuzodinma/Library/Mobile Documents/com~apple~CloudDocs/Documents-Kosi-Mac-mini/AI-Built-Applications/UzoFitnessWeb"
```

Before opening a PR (pre-rebase and squash-cleanup)
1) Ensure your feature branch is rebased on latest `main`
```bash
# In the epic worktree
git fetch origin --prune
git switch migration/<epic>-NN-<summary>
git rebase --rebase-merges --autostash origin/main
# Resolve conflicts → add/continue
git push --force-with-lease -u origin HEAD

# Create PR (requires GitHub CLI)
BR=$(git rev-parse --abbrev-ref HEAD)
gh pr create --base main --head "$BR" --fill --title "<scope>: <short summary>"
```

2) Optional: tidy up commits locally before PR (interactive squash)
```bash
git rebase -i origin/main
# mark fixups/squash, write a clean, descriptive final commit message
git push --force-with-lease
```

Open PR with GitHub “Squash and merge” selected as the merge method.

After a PR is approved by the user and merged to `main` (post-rebase)
1) Update `main`
```bash
cd worktrees/main
git fetch origin --prune
git pull --ff-only origin main
```

2) Rebase each active epic branch and new feature branches onto `main` (in parallel terminals)
```bash
# Example: Logging worktree (persistent)
cd ../../worktrees/logging
git fetch origin --prune
git rebase --rebase-merges --autostash origin/main

# Resolve conflicts if any, then:
#   git add -A
#   git rebase --continue

# Verify locally
cd app
npm install
npm run build
npm run test
npx playwright test --reporter=line --project=chromium --grep "smoke|core|logging"

# Push updated branch
cd ..
git push --force-with-lease
```

Repeat step 2 for each worktree: `core`, `library`, `history`, `progress`, `settings`, `pwa-infra`, `testing-ci`.

3) Feature branches inside epic worktrees
- Create and work from short-lived branches named `migration/<epic>-NN-<summary>` off `origin/main`.
- Rebase them the same way as the persistent epic branch:
```bash
git fetch origin --prune
git switch migration/<epic>-NN-<summary>
git rebase --rebase-merges --autostash origin/main
# resolve → continue, then push with lease
git push --force-with-lease -u origin HEAD
```

4) Open next small PRs (Squash and merge)
- Keep PRs scoped to the checkboxes in `React-Migration/16-Tasks.md`.
- Ensure CI (unit + e2e smoke) is green before requesting review.
- Merge using GitHub “Squash and merge” to keep a linear history.

Notes
- If contracts changed (e.g., `contracts-v2` tag exists), all epics must rebase on the tagged main. Validate no accidental changes to:
  - @app/src/data/types.ts
  - @app/src/data/db.ts
  - @app/src/data/queryKeys.ts
  - @app/src/data/repositories/contracts.ts
  - @app/src/routes/paths.ts
- To remove a finished epic’s worktree:
```bash
git worktree remove -f worktrees/logging
git branch -D migration/logging
```


