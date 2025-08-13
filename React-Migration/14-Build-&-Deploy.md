### Build & Deploy

Stack: Vite + SWC, GitHub Actions CI, deploy to Vercel.

Scripts
- dev: `vite`
- build: `vite build`
- preview: `vite preview`
- test: `vitest run`
- e2e: `playwright test`

Env vars
- Local (Supabase CLI):
  - `VITE_SUPABASE_URL=http://127.0.0.1:54321`
  - `VITE_SUPABASE_ANON_KEY` from `supabase status`
- Hosted (when ready): project URL and anon key from Supabase project settings

CI (GitHub Actions)
- Install deps, build, run unit tests
- Upload Playwright report on e2e workflow
- Deploy on main push via Vercel token

Why Vercel
- Fast previews, first-class Vite support, SW-friendly. Netlify is comparable; either works.


