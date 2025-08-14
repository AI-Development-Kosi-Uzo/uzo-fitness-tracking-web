### Library epic rules and kickoff

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
@React-Migration/09-Component-Specs/Library.md
@React-Migration/16-Tasks.md
@app/src/data/types.ts
@app/src/data/db.ts
@app/src/data/queryKeys.ts
@app/src/data/repositories/contracts.ts
@app/src/routes/paths.ts

Kickoff
You are the Library agent for UzoFitness React PWA.

Read and strictly follow the pinned specs and runbooks.

Branch: migration/library
Owns (only these paths):
- app/src/routes/library/**
- app/src/components/library/**
- app/src/state (only local UI stores if needed)
- Tests under app/src/tests for your features

Rules:
- Do NOT modify 01/02/04/05/06. Use repository interfaces; no schema changes.
- Small PRs with unit + minimal e2e smoke for touched routes.
- PR description: list the exact checkboxes from 16-Tasks.md you completed.

Branching within this worktree (keep worktree persistent)
- Create feature branches off `origin/main` using:
  - `migration/library-NN-<short-dashed-summary>`
- Example:
```bash
git fetch origin --prune
git switch -c migration/library-01-list-templates-and-exercises origin/main
```

Plan:
- Implement `/library`, `/library/templates/:templateId`, `/library/exercises`.
- CRUD for templates/exercises; day/exercise template listing by ids; drag-to-reorder via `position`.
- Build components: TemplateEditor, DayList, ExerciseTemplateRow, ExercisePicker.
- Activate plan flow: activate from template with custom name and start date.

File list:
- app/src/routes/library/index.tsx
- app/src/routes/library/template.$id.tsx
- app/src/routes/library/exercises.tsx
- app/src/components/library/TemplateEditor.tsx
- app/src/components/library/DayList.tsx
- app/src/components/library/ExerciseTemplateRow.tsx
- app/src/components/library/ExercisePicker.tsx
- app/src/tests/integration/library.forms.spec.ts
- app/src/tests/e2e/library.smoke.spec.ts

First PR boundary:
- `/library` lists templates and exercises (read-only) with loading/empty states.
- Basic “Create Template” and “Create Exercise” dialogs with validation.
- E2E smoke: create, list refresh, route to template detail.

On success (commit & PR)
```bash
# Ensure you're on your feature branch (migration/library-NN-<summary>)
cd app
npm run build && npm run test && npx playwright test --project=chromium --grep "smoke|library"
cd ..
git add -A
git commit -m "feat(library): <short summary>"
# Pre-PR rebase and push (see 10-rebase-worktrees.md)
git fetch origin --prune
git rebase --rebase-merges --autostash origin/main
git push --force-with-lease -u origin HEAD

# Create PR (Squash and merge; requires GitHub CLI)
BR=$(git rev-parse --abbrev-ref HEAD)
gh pr create --base main --head "$BR" --fill --title "feat(library): <short summary>"
```


