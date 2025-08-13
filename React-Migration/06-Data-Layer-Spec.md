### Data Layer Spec

Stack: Dexie (IndexedDB) for local; Supabase (Postgres+Auth+Storage) for sync. Use Supabase CLI locally first (no hosted costs), then switch env vars for production. JSON shapes from [01-Domain-Models.yml](./01-Domain-Models.yml).

#### Dexie schema (TypeScript)
```ts
export const db = new Dexie('uzofitness') as Dexie & {
  exercises: Table<Exercise, string>;
  workoutTemplates: Table<WorkoutTemplate, string>;
  dayTemplates: Table<DayTemplate, string>;
  exerciseTemplates: Table<ExerciseTemplate, string>;
  workoutPlans: Table<WorkoutPlan, string>;
  workoutSessions: Table<WorkoutSession, string>;
  sessionExercises: Table<SessionExercise, string>;
  completedSets: Table<CompletedSet, string>;
  performedExercises: Table<PerformedExercise, string>;
  progressPhotos: Table<ProgressPhoto, string>;
};

db.version(1).stores({
  exercises: 'id,name',
  workoutTemplates: 'id,name,createdAt',
  dayTemplates: 'id,weekday,workoutTemplateId',
  exerciseTemplates: 'id,dayTemplateId,exerciseId,supersetId,position',
  workoutPlans: 'id,isActive,startedAt,templateId',
  workoutSessions: 'id,date,planId',
  sessionExercises: 'id,sessionId,exerciseId,supersetId,position',
  completedSets: 'id,sessionExerciseId,position',
  performedExercises: 'id,exerciseId,workoutSessionId,performedAt',
  progressPhotos: 'id,date,angle'
});
```

Indexes chosen to support common queries: list templates, day exercises by order, active plan lookup, today’s session, superset grouping, photo grids.

#### Sync strategy
- Supabase local-first:
  - Run `supabase start` and apply migrations from `supabase/migrations` (see 10-API-Contracts.md)
  - Tables mirror Dexie; UUID PKs and createdAt timestamps
  - RLS: per-user via `auth.uid()`; sign in locally to test
  - Storage: `progress-photos/` bucket (private)
- Offline-first:
  - Mutations recorded in an outbox (Dexie table `mutationQueue`)
  - Background Sync Tag: `uzofitness-sync`
  - On regain connectivity, service worker flushes mutations in order; conflicts resolved client-wins with server validation callbacks

#### Conflict resolution
- Entities with positions (exerciseTemplates, sessionExercises, completedSets): last-write-wins per list with server-side normalization
- Session finish: idempotent by session id; conversion to performedExercises checked by unique composite `(workoutSessionId, exerciseId, position)`

#### Optimistic updates
- Add/edit set: update list immediately; enqueue mutation
- Toggle completion: optimistic toggle; rollback on failure with toast

#### Derived computations
- Utilities compute `totalVolume`, `volumeChange` in-memory; persist cached last-used values on session finish


