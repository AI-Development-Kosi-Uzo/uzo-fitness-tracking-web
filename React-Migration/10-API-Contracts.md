### API Contracts (Supabase option — local-first)

Local-first note: Use Supabase CLI + Docker to run Postgres/Auth/Storage locally while developing and testing. Only switch to hosted when ready.

If cloud sync is enabled, define tables and policies. Schema mirrors [01-Domain-Models.yml](./01-Domain-Models.yml).

#### Tables (SQL DDL)
```sql
-- Exercises
create table if not exists exercises (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text not null,
  instructions text not null default '',
  media_asset_id text,
  last_used_weight double precision,
  last_used_reps int,
  last_total_volume double precision,
  last_used_date timestamptz,
  unique (user_id, lower(name))
);

-- Workout Templates
create table if not exists workout_templates (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  summary text not null default '',
  created_at timestamptz not null default now(),
  unique (user_id, lower(name))
);

-- Day Templates
create table if not exists day_templates (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  workout_template_id uuid not null references workout_templates(id) on delete cascade,
  weekday text not null,
  is_rest boolean not null default false,
  notes text not null default ''
);

-- Exercise Templates
create table if not exists exercise_templates (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  day_template_id uuid not null references day_templates(id) on delete cascade,
  exercise_id uuid not null references exercises(id) on delete restrict,
  set_count int not null,
  reps int not null,
  weight double precision,
  position double precision not null,
  superset_id uuid
);

-- Workout Plans
create table if not exists workout_plans (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  template_id uuid references workout_templates(id) on delete set null,
  custom_name text not null,
  is_active boolean not null default false,
  started_at timestamptz not null,
  duration_weeks int not null,
  notes text not null default '',
  ended_at timestamptz
);

-- Workout Sessions
create table if not exists workout_sessions (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id uuid references workout_plans(id) on delete set null,
  date timestamptz not null,
  title text not null default '',
  duration double precision,
  created_at timestamptz not null default now()
);

-- Session Exercises
create table if not exists session_exercises (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id uuid not null references workout_sessions(id) on delete cascade,
  exercise_id uuid not null references exercises(id) on delete restrict,
  planned_sets int not null,
  planned_reps int not null,
  planned_weight double precision,
  position double precision not null,
  superset_id uuid,
  previous_total_volume double precision,
  previous_session_date timestamptz,
  current_set int not null,
  is_completed boolean not null default false,
  rest_timer double precision,
  created_at timestamptz not null default now()
);

-- Completed Sets
create table if not exists completed_sets (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  session_exercise_id uuid not null references session_exercises(id) on delete cascade,
  reps int not null,
  weight double precision not null,
  is_completed boolean not null default false,
  position int not null,
  external_sample_id uuid
);

-- Performed Exercises (history)
create table if not exists performed_exercises (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  workout_session_id uuid references workout_sessions(id) on delete set null,
  exercise_id uuid not null references exercises(id) on delete restrict,
  performed_at timestamptz not null,
  reps int not null,
  weight double precision not null
);

-- Progress Photos
create table if not exists progress_photos (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  date timestamptz not null,
  angle text not null,
  asset_identifier text not null,
  weight_sample_id uuid,
  notes text not null default '',
  manual_weight double precision,
  created_at timestamptz not null default now()
);

-- Helpful indexes
create index if not exists idx_sessions_by_date on workout_sessions(user_id, date desc);
create index if not exists idx_ex_template_by_day on exercise_templates(day_template_id, position);
create index if not exists idx_session_ex_by_session on session_exercises(session_id, position);
create index if not exists idx_completed_sets_by_ex on completed_sets(session_exercise_id, position);
create index if not exists idx_progress_photos_by_angle on progress_photos(user_id, angle, date desc);
```

#### RLS Policies
Enable RLS on all tables and apply:
```sql
alter table exercises enable row level security;
create policy exercises_isolation on exercises using (user_id = auth.uid()) with check (user_id = auth.uid());
-- Repeat for all tables listed above
```

Local testing
- Start local stack: `supabase start`
- Apply migrations: `supabase db reset`
- Env for app: `VITE_SUPABASE_URL=http://127.0.0.1:54321`, `VITE_SUPABASE_ANON_KEY=<from supabase status>`

#### Storage (photos)
- Bucket: `progress-photos` (private)
- Path: `user_id/YYYY/MM/<uuid>.jpg`

#### RPCs (optional)
Atomically finish a session and create history:
```sql
create or replace function finish_session(p_session_id uuid)
returns void language plpgsql security definer as $$
begin
  -- Set duration if null
  update workout_sessions
  set duration = coalesce(duration, extract(epoch from (now() - created_at)))
  where id = p_session_id and user_id = auth.uid();

  -- Insert performed_exercises from completed_sets
  insert into performed_exercises (id, user_id, workout_session_id, exercise_id, performed_at, reps, weight)
  select gen_random_uuid(), se.user_id, ws.id, se.exercise_id, ws.date, cs.reps, cs.weight
  from session_exercises se
  join workout_sessions ws on ws.id = se.session_id
  join completed_sets cs on cs.session_exercise_id = se.id and cs.is_completed = true
  where se.session_id = p_session_id and se.user_id = auth.uid();
end;$$;
```

Deployment note
- When moving to hosted Supabase, run the same migrations via `supabase db push` targeting the remote project; update env vars in CI and Vercel.



