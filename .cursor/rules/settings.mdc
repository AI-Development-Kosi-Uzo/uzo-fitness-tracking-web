### Settings epic rules and kickoff

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
@React-Migration/09-Component-Specs/Settings.md
@React-Migration/16-Tasks.md
@app/src/data/types.ts
@app/src/data/db.ts
@app/src/data/queryKeys.ts
@app/src/data/repositories/contracts.ts
@app/src/routes/paths.ts

Kickoff
You are the Settings agent for UzoFitness React PWA.

Read and strictly follow the pinned specs and runbooks.

Branch: migration/settings
Owns (only these paths):
- app/src/routes/settings/**
- app/src/components/settings/**
- app/src/state (only local UI stores if needed)
- Tests under app/src/tests for your features

Rules:
- Do NOT modify 01/02/04/05/06. Use repository interfaces; no schema changes.
- Small PRs with unit + minimal e2e smoke for touched routes.
- PR description: list the exact checkboxes from 16-Tasks.md you completed.

Branching within this worktree (keep worktree persistent)
- Create feature branches off `origin/main` using:
  - `migration/settings-NN-<short-dashed-summary>`
- Example:
```bash
git fetch origin --prune
git switch -c migration/settings-01-permissions-sections origin/main
```

Plan:
- Implement `/settings` with sections for Permissions and Preferences.
- Detect and display support/status for Notifications and Camera/Photo access; provide request buttons where applicable.
- Provide links or controls for manual metrics entry (Progress) and basic data management stubs (export/import placeholders).
- Keep all permission prompts user-initiated; no background requests.

File list:
- app/src/routes/settings/index.tsx
- app/src/components/settings/Permissions.tsx
- app/src/components/settings/PreferenceRow.tsx
- app/src/utils/permissions.ts
- app/src/tests/unit/permissions.spec.ts
- app/src/tests/e2e/settings.smoke.spec.ts

First PR boundary:
- `/settings` route renders two sections: Permissions (camera/photos, notifications) and Preferences (a couple of stub toggles).
- Feature detection utility returns statuses; buttons are disabled if unsupported.
- E2E smoke: route mounts; sections and key elements render.

On success (commit & PR)
```bash
# Ensure you're on your feature branch (migration/settings-NN-<summary>)
cd app
npm run build && npm run test && npx playwright test --project=chromium --grep "smoke|settings"
cd ..
git add -A
git commit -m "feat(settings): <short summary>"
# Pre-PR rebase and push (see 10-rebase-worktrees.md)
git fetch origin --prune
git rebase --rebase-merges --autostash origin/main
git push --force-with-lease -u origin HEAD

# Create PR (Squash and merge; requires GitHub CLI)
BR=$(git rev-parse --abbrev-ref HEAD)
gh pr create --base main --head "$BR" --fill --title "feat(settings): <short summary>"
```


