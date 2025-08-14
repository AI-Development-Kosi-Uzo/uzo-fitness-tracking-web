### AI Migration Runbook: UzoFitness iOS → React PWA

This step-by-step guide is optimized for an AI agent to bootstrap the React + TypeScript PWA, wire the architecture, and begin implementing features. Cross-reference the migration pack for details.

#### Read first (context links)
- 00 Audit: [../00-Audit.md](../00-Audit.md)
- Domain schema: [../01-Domain-Models.yml](../01-Domain-Models.yml)
- Feature → route map: [../02-Feature-Map.md](../02-Feature-Map.md)
- UI inventory: [../03-UI-Inventory.csv](../03-UI-Inventory.csv)
- Design tokens: [../04-Design-Tokens.json](../04-Design-Tokens.json)
- Architecture: [../05-React-Architecture.md](../05-React-Architecture.md)
- Data layer spec: [../06-Data-Layer-Spec.md](../06-Data-Layer-Spec.md)
- PWA spec: [../07-PWA-Spec.md](../07-PWA-Spec.md)
- iOS → Web mapping: [../08-Platform-Mapping.md](../08-Platform-Mapping.md)
- Component specs: [../09-Component-Specs/README.md](../09-Component-Specs/README.md)
- API contracts (optional cloud): [../10-API-Contracts.md](../10-API-Contracts.md)
- A11y: [../11-Accessibility-Checklist.md](../11-Accessibility-Checklist.md)
- Performance: [../12-Performance-Budget.md](../12-Performance-Budget.md)
- Testing: [../13-Testing-Plan.md](../13-Testing-Plan.md)
- Build & Deploy: [../14-Build-&-Deploy.md](../14-Build-&-Deploy.md)
- PRD: [../15-PRD.md](../15-PRD.md)
- Task plan: [../16-Tasks.md](../16-Tasks.md)

---

### 1) Prerequisites
- Node 18+ (recommend 20+)
- Package manager: npm or pnpm
- GitHub account (for CI) and Vercel (for deploy) if using hosting

Verify:
```bash
node -v
npm -v
```

### 2) Scaffold the project (Vite + React + TS + SWC)
Create the PWA app in `app/` as specified in architecture.
```bash
cd <repo-root>
npm create vite@latest app -- --template react-swc-ts
cd app
npm install
```

Install core deps:
```bash
npm install @tanstack/react-router @tanstack/react-query zustand dexie react-hook-form zod recharts
npm install -D tailwindcss postcss autoprefixer workbox-build workbox-window vite-plugin-pwa vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom playwright @types/node
```

### 3) Configure Tailwind and tokens
Follow tokens in [../04-Design-Tokens.json](../04-Design-Tokens.json).
```bash
npx tailwindcss init -p
```
Update Tailwind config to read tokens; create `app/src/styles/tokens.css` and include the `cssVariables` snippet from tokens. Import it in `main.tsx` or global CSS.

### 3b) Mobile-first iOS-style design system (minimalist)
- Design goals: high clarity, minimal chrome, fast, thumb-friendly.
- Layout
  - Single column; center content; max width 480–560px on large screens.
  - Respect safe areas with `env(safe-area-inset-*)`.
  - Spacing, radii, colors, and typography come from design tokens only.
  - Prefer `clamp()` for responsive type and spacing where needed.
- Color & elevation
  - Light: subtle neutrals for background; one primary accent; semantic states.
  - Dark: same tokens; avoid pure black; respect contrast ratios.
  - Elevation via soft shadows and optional translucency (backdrop-blur).
- Typography
  - System font stack tuned for iOS feel: `-apple-system, system-ui, Segoe UI, Roboto, Inter, sans-serif`.
  - Use token-driven sizes and weights; avoid arbitrary font sizes.
- Components
  - Navigation bar (title centered, large title on scroll), Tab bar (5 max items), segmented control, lists/cards, sheets/modals with rounded corners.
  - Buttons: primary/secondary/destructive; 44px min touch target; generous hit areas.
  - Inputs: large labels/placeholders; clear affordances; inline validation.
- Motion & feedback
  - Durations 150–250ms; standard ease tokens; respect `prefers-reduced-motion`.
  - Toast/banners for sync/offline; skeletons for loading.
- States
  - Pressed opacity/scale 0.98; focus rings visible for keyboard; disabled lowered contrast.
- Iconography
  - Use a consistent set (e.g., Phosphor, Heroicons) with `currentColor`.
- Implementation snippets
```css
/* Safe areas */
html, body { height: 100%; }
body { padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left); }

/**** Tokens usage: pull values from app/src/styles/tokens.css ****/
:root { /* tokens are generated; example usage only */ }

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }
}
```
```tsx
// Page container (max width + gradient background + safe areas handled globally)
export const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mx-auto max-w-[560px] min-h-dvh bg-gradient-to-b from-white to-slate-50 dark:from-gray-950 dark:to-gray-900">
    {children}
  </div>
)
```
```tsx
// Card (minimal elevation + rounded corners)
export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-2xl bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.08),0_10px_20px_-10px_rgba(0,0,0,0.25)]">
    {children}
  </div>
)
```
```ts
// Interaction constants
export const motion = { fast: 150, base: 200, slow: 250 }
export const easing = { standard: 'cubic-bezier(0.2, 0, 0, 1)', empha: 'cubic-bezier(0.4, 0, 0.2, 1)' }
```

### 4) Establish project layout
Replicate structure from [../05-React-Architecture.md](../05-React-Architecture.md).
```text
app/src/
  routes/
    root.tsx
    log/{index.tsx,session.tsx}
    library/{index.tsx,template.$id.tsx,exercises.tsx}
    history/index.tsx
    progress/{stats.tsx,photos.tsx}
    settings/index.tsx
  components/{log,library,progress,history}
  state/
  data/
  services/
  utils/
  styles/tokens.css
  sw/
```

Bootstrap router and app entry:
```ts
// app/src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import './styles/tokens.css'
import './index.css'

const router = createRouter({ routeTree })
declare module '@tanstack/react-router' { interface Register { router: typeof router } }

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
```
Generate routes with the file-based plugin or define manually per TanStack Router docs; mirror paths in [../02-Feature-Map.md](../02-Feature-Map.md).

### 2b) Supabase local (optional now, required before sync)
- You already have Docker and Supabase CLI installed. Start local stack in repo root:
```bash
supabase init
supabase start
supabase status  # note API URL and anon key
```
- Create a migration and paste SQL from [../10-API-Contracts.md](../10-API-Contracts.md):
```bash
supabase migration new core-schema
# paste DDL into supabase/migrations/*_core-schema.sql
supabase db reset  # apply
```
- Create storage bucket (progress-photos) via migration SQL or psql.
- App env (local): `app/.env.local`
```bash
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=<from supabase status>
```
- Client setup:
```ts
// app/src/data/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL!, import.meta.env.VITE_SUPABASE_ANON_KEY!)
```

### 5) Data layer: types, Dexie schema, repositories
Implement shapes from [../01-Domain-Models.yml](../01-Domain-Models.yml) and store/indexing from [../06-Data-Layer-Spec.md](../06-Data-Layer-Spec.md).
```ts
// app/src/data/types.ts (excerpt)
export interface Exercise { id: string; name: string; category: 'strength'|'cardio'|'mobility'|'balance'; instructions: string; mediaAssetId?: string | null; lastUsedWeight?: number | null; lastUsedReps?: number | null; lastTotalVolume?: number | null; lastUsedDate?: string | null }
```
```ts
// app/src/data/db.ts (excerpt per 06-Data-Layer-Spec.md)
import Dexie, { Table } from 'dexie'
export class UzoDb extends Dexie { exercises!: Table<Exercise,string>; /* ...others */ constructor(){ super('uzofitness'); this.version(1).stores({ exercises:'id,name', /* ... */ }) } }
export const db = new UzoDb()
```
Create repositories `app/src/data/repositories/*.ts` for CRUD and React Query hooks.

### 6) State management (Zustand)
Create stores for timers and UI as in [../05-React-Architecture.md](../05-React-Architecture.md):
```ts
// app/src/state/timers.store.ts (excerpt)
import { create } from 'zustand'
type TimersState = { workoutSeconds: number; restByExerciseId: Record<string, number>; startWorkout(): void; tick(): void; startRest(id: string, seconds: number): void }
export const useTimers = create<TimersState>(() => ({ workoutSeconds:0, restByExerciseId:{}, startWorkout(){}, tick(){}, startRest(){ } }))
```

### 7) Routes and page stubs
Create empty pages and wire routes matching [../02-Feature-Map.md](../02-Feature-Map.md): `/log`, `/log/session`, `/library`, `/library/templates/:templateId`, `/library/exercises`, `/history`, `/progress/stats`, `/progress/photos`, `/settings`.

### 8) Components
Use [03-UI-Inventory.csv](../03-UI-Inventory.csv) and per-screen specs in [09-Component-Specs](../09-Component-Specs/README.md) to implement:
- Log: ExerciseRow, SetRow, RestTimerButton, RestTimerPicker, SessionHeader
- Library: TemplateEditor, DayList, ExerciseTemplateRow, ExercisePicker
- History: Calendar, SessionList
- Progress: Chart, PhotoGrid, CompareView, EditPhotoModal

### 9) PWA setup
Follow [../07-PWA-Spec.md](../07-PWA-Spec.md):
- Add `manifest.webmanifest` with icons
- Register service worker; generate Workbox SW (precaching + background sync)
- Implement mutation outbox table and queue flush

### 10) Optional Supabase integration
If enabling cloud sync, provision schema per [../10-API-Contracts.md](../10-API-Contracts.md), set env vars, and add network repositories mirroring local repos.

### 11) Testing
Adopt a strict TDD loop: write a failing test, implement minimally, refactor, and keep all tests green before proceeding.
- Unit: utils (totals, streaks), Zustand stores
- Integration: forms (RHF+Zod), repos (fake IndexedDB)
- E2E: core flows (create → activate → log → finish → history/trends), photos (upload/compare/edit), offline → online queue flush

Commands (example; adjust if different in your `app/package.json`):
```bash
# Unit/integration tests (watch)
npm --prefix app run test:watch

# Unit/integration tests (CI)
npm --prefix app run test

# E2E: run dev server + playwright
npm --prefix app run dev &
SERVER_PID=$!
trap "kill $SERVER_PID" EXIT
npm --prefix app run e2e
```

E2E device profile (mobile-first):
```ts
// app/playwright.config.ts (excerpt)
import { defineConfig, devices } from '@playwright/test'
export default defineConfig({
  projects: [
    { name: 'webkit-iphone', use: { ...devices['iPhone 12'] } },
    { name: 'chromium-mobile', use: { ...devices['Pixel 7'] } },
  ],
})
```

Guidelines
- Keep tests colocated next to code; name with `.spec.ts(x)`
- Use `@testing-library/react` and avoid implementation details
- For Zustand, assert state transitions and timers deterministically (jest fake timers or vitest timers)
- For repos, use fake IndexedDB and seed realistic fixtures
- For E2E, emulate iPhone dimensions and touch; verify accessibility roles and labels
- Gate merges on green unit + e2e suites

### 12) CI and deploy
Apply [../14-Build-&-Deploy.md](../14-Build-&-Deploy.md):
- GitHub Actions: install, build, test
- Vercel project + token; deploy previews and main

### 13) Accessibility and performance
Audit with [../11-Accessibility-Checklist.md](../11-Accessibility-Checklist.md) and enforce budgets in [../12-Performance-Budget.md](../12-Performance-Budget.md).

### 14) Execution loop (do this until complete)
Use the ordered plan in [../16-Tasks.md](../16-Tasks.md). For each task:
1. Open linked spec(s) from this runbook
2. Write/adjust tests first (unit/integration/E2E as applicable)
3. Implement files exactly at the indicated paths to satisfy tests
4. Run unit tests and ensure green; iterate until passing
5. Run E2E critical path on mobile viewport (iPhone 12/13 dimensions)
6. Commit and push (if allowed by workflow)
7. Update `React-Migration/16-Tasks.md`: check the completed item(s) under your agent in “Remaining Tasks by Parallel Workstream” and optionally append `(PR #<number>)`

Milestones (suggested):
- M1: Scaffold + routes + tokens + Dexie schema
- M2: Logging flow (no cloud), timers, finish session pipeline
- M3: Library CRUD + reordering + activation
- M4: History calendar + streaks
- M5: Progress stats + photos local
- M6: PWA offline + background sync
- M7: Supabase sync (optional) + CI/CD + performance hardening

---

Quick references
- Models: [../01-Domain-Models.yml](../01-Domain-Models.yml)
- Data layer: [../06-Data-Layer-Spec.md](../06-Data-Layer-Spec.md)
- Routes: [../02-Feature-Map.md](../02-Feature-Map.md)
- Components: [../09-Component-Specs/README.md](../09-Component-Specs/README.md)
- PWA: [../07-PWA-Spec.md](../07-PWA-Spec.md)


