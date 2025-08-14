### React + TypeScript Architecture

Why these choices (brief):
- React 18 + Vite + SWC: fast DX, modern bundling
- Router: TanStack Router for nested layouts and data-aware routing without framework lock-in
- State: Zustand for local UI/timers; React Query for async/server state + caching
- Styling: Tailwind with tokens (see 04-Design-Tokens.json)
- Forms: React Hook Form + Zod
- Data: IndexedDB via Dexie for offline-first; optionally Supabase for sync
- PWA: Workbox for offline shell and background sync

#### Project layout
```
app/
  index.html
  src/
    main.tsx
    routes/              # TanStack Router routes
      root.tsx
      log/
        index.tsx
        session.tsx
      library/
        index.tsx
        template.$id.tsx
        exercises.tsx
      history/index.tsx
      progress/
        stats.tsx
        photos.tsx
      settings/index.tsx
    components/
      log/...
      library/...
      progress/...
    state/               # Zustand stores (timers, UI)
    data/                # Dexie schema, repositories, React Query keys
    services/            # Photo capture, HealthKit alternatives
    utils/               # date, formatters, invariants
    styles/
      tokens.css         # from 04-Design-Tokens.json
    sw/                  # Workbox service worker
    charts/              # Recharts primitives and theme
    tests/
```

#### Unidirectional data flow
- UI → dispatch intents (handlers) → repositories (Dexie/Remote) → invalidate/query → UI
- Derived selectors for computed totals, streaks, trends

#### Where state lives
- Zustand: timers (rest/workout), modal visibility, segmented controls, ephemeral selections
- React Query: entities (templates, plans, sessions, exercises, photos, performedExercises)
- Form local state: RHF

#### Error/loading patterns
- Suspense for route-level queries; skeletons for lists
- Toasts for mutation success/failure
- Global error boundary for unexpected errors

#### Timers strategy
- useInterval with document visibility handling; pause on hidden, resume on visible
- Persist countdown remaining to store to handle brief tab suspensions

#### Access layer
- data/repositories/* implement CRUD with Dexie; optional remote sync repository using Supabase
- All mutations enqueue to background-sync queue when offline

See: [06-Data-Layer-Spec.md](./06-Data-Layer-Spec.md), [07-PWA-Spec.md](./07-PWA-Spec.md)

<<<<<<< Current (Your changes)
=======
#### Ownership Boundaries (for Parallel Work)
- Data layer (`app/src/data/**/*`) is owned by Agent B
- Routes and app shell (`app/src/routes/**/*`, `app/src/main.tsx`) are owned by Agent C and relevant feature agents
- Feature UI components live under `app/src/components/<feature>/**/*` and are owned by that feature agent
- Shared UI primitives live under `app/src/components/shared/**/*` and can be edited by Agent A/E only
- Styles and tokens (`app/src/styles/**/*`) owned by Agent A/E

#### Import Rules
- `routes/*` may import from `components/*` and `data/*` only
- No cross-feature imports between `components/<feature>` directories
- `data` implementations (Dexie/Supabase) must not be imported from `routes` directly; expose hooks/helpers via repository interfaces

>>>>>>> Incoming (Background Agent changes)

