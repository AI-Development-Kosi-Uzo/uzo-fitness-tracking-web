# Parallelization and Dependencies

Follow `React-Migration/16-Tasks.md` → Execution order and parallelization.

Can run in parallel now:
- Agents D/E/F/G (UI components listed under Remaining Tasks by Parallel Workstream)
- Agent P (local outbox module + SW registration and app shell precache)
- Agent T (Vitest baseline for utils/stores; Playwright smoke)
- Agent A (Vercel project + preview deploys)

Must wait / sequence:
- Agent B must complete Supabase local setup and remote repositories before enabling remote sync:
  1) `supabase init` + `supabase start`
  2) Apply migrations from `React-Migration/10-API-Contracts.md` via `supabase db reset`
  3) Add `app/.env.local` with URL/key
  4) Create `app/src/data/supabaseClient.ts` and remote repositories
- Agent P remote background sync wiring waits for Agent B’s remote repos and `.env`
- Agent A production deployment waits for green CI and required `.env`

Task updates:
- On merge, agents must check off the relevant items in `React-Migration/16-Tasks.md` and include the PR number.
