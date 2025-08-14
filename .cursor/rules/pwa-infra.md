### PWA/Infra epic rules and kickoff

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
@React-Migration/07-PWA-Spec.md
@React-Migration/16-Tasks.md
@app/src/data/types.ts
@app/src/data/db.ts
@app/src/data/queryKeys.ts
@app/src/data/repositories/contracts.ts
@app/src/routes/paths.ts

Kickoff
You are the PWA/Infra agent for UzoFitness React PWA.

Read and strictly follow the pinned specs and runbooks.

Branch: migration/pwa-infra
Owns (only these paths):
- app/public/** (manifest and icons)
- app/src/sw/**
- app/src/data/outbox.ts
- workbox.config.ts
- vite config and SW registration wiring
- Tests under app/src/tests for your features

Rules:
- Do NOT modify 01/02/04/05/06. Use repository interfaces; no schema changes.
- Small PRs with unit + minimal e2e smoke for touched routes.
- PR description: list the exact checkboxes from 16-Tasks.md you completed.

Branching within this worktree (keep worktree persistent)
- Create feature branches off `origin/main` using:
  - `migration/pwa-infra-NN-<short-dashed-summary>`
- Example:
```bash
git fetch origin --prune
git switch -c migration/pwa-infra-01-manifest-and-sw-registration origin/main
```

Plan:
- Add `manifest.webmanifest` and icons; register Workbox SW.
- Implement mutation outbox and Background Sync tag `uzofitness-sync`.
- Configure precaching of app shell; runtime strategies for images/GETs.
- Add install prompt strategy.

File list:
- app/public/manifest.webmanifest
- app/src/sw/sw.ts
- app/src/data/outbox.ts
- workbox.config.ts
- app/src/sw/registerSW.ts
- app/src/tests/integration/offline.queue.spec.ts
- app/src/tests/e2e/offline.smoke.spec.ts

First PR boundary:
- Manifest + SW registration + minimal Workbox config producing a built SW with app shell precache.
- Outbox module skeleton with enqueue/dequeue and a unit test.
- E2E smoke: service worker registered; offline navigates cached shell.

On success (commit & PR)
```bash
# Ensure you're on your feature branch (migration/pwa-infra-NN-<summary>)
cd app
npm run build && npm run test && npx playwright test --project=chromium --grep "smoke|offline"
cd ..
git add -A
git commit -m "feat(pwa-infra): <short summary>"
# Pre-PR rebase and push (see 10-rebase-worktrees.md)
git fetch origin --prune
git rebase --rebase-merges --autostash origin/main
git push --force-with-lease -u origin HEAD

# Create PR (Squash and merge; requires GitHub CLI)
BR=$(git rev-parse --abbrev-ref HEAD)
gh pr create --base main --head "$BR" --fill --title "feat(pwa-infra): <short summary>"
```


