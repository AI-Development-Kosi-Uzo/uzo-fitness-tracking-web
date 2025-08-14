### Shared rules: UzoFitness React PWA migration (Cursor)

Pinned docs and contracts (do not modify):
@React-Migration/Runbooks/AGENT-RUNBOOK.md
@React-Migration/Runbooks/Runbook-Cursor-Agent.md
@React-Migration/Runbooks/Runbook-Cursor-Human.md
@React-Migration/01-Domain-Models.yml
@React-Migration/02-Feature-Map.md
@React-Migration/04-Design-Tokens.json
@React-Migration/05-React-Architecture.md
@React-Migration/06-Data-Layer-Spec.md
@React-Migration/07-PWA-Spec.md
@React-Migration/13-Testing-Plan.md
@React-Migration/16-Tasks.md

Contracts in code (frozen once Core PR merges):
@app/src/data/types.ts
@app/src/data/db.ts
@app/src/data/queryKeys.ts
@app/src/data/repositories/contracts.ts
@app/src/routes/paths.ts

Branching
- migration/core
- migration/logging
- migration/library
- migration/history
- migration/progress
- migration/settings
- migration/pwa-infra
- migration/testing-ci

Rules
- Do not change pinned contracts/specs. Propose changes via a tiny PR from `migration/core` only.
- Ship in small PRs. Each PR must include unit tests; if a route renders, include a minimal e2e smoke.
- Own only your epic paths. Do not modify others’ folders.
- Reference repository interfaces; do not change schema.
 - Always rebase feature branches onto `origin/main` before opening a PR and again after the PR is merged.
 - Merge strategy: use GitHub "Squash and merge" for all PRs (linear history; no merge commits).

Feature branch convention (keep worktrees persistent)
- Keep one persistent worktree per epic pointing to `migration/<epic>`.
- For each task/PR, create a short-lived branch inside that worktree off `origin/main` named:
  - `migration/<epic>-NN-<short-dashed-summary>` (NN is zero-padded sequence like 01, 02, ...)
- Example helper (run inside the epic worktree):
```bash
EPIC=logging
TASK_NUM=01
SUMMARY="Start session route stubs"
BRANCH="migration/${EPIC}-$(printf '%02d' "$TASK_NUM")-$(echo "$SUMMARY" | tr '[:upper:]' '[:lower:]' | tr -cs 'a-z0-9' '-' | sed 's/^-\\|-$$//g' | sed 's/--\+/-/g')"
git fetch origin --prune
git switch -c "$BRANCH" origin/main
```
- Target PRs to `main`. After merge, switch back to `migration/<epic>` in the worktree and delete the feature branch.

Rebase workflow (worktrees)
- See: @.cursor/rules/10-rebase-worktrees.md


