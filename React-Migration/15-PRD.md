### Product Requirements Document: UzoFitness PWA

Goal: Rebuild UzoFitness as a mobile-first React PWA with feature parity to iOS app.

Users
- Individuals tracking strength workouts and body progress

Core features (MVP)
- Templates & Exercises: create, edit, reorder, superset grouping
- Plans: activate one plan at a time
- Logging: start/resume session, log sets, timers, finish session
- History: calendar, streaks, view sessions
- Progress: trends (weekly), photos grid, compare, edit metadata
- Settings: permissions and info

Non-goals (MVP)
- Real HealthKit reads; replaced with manual entry and view-only metrics
- Push notifications

Success criteria
- PWA installable, offline-capable with queued mutations
- All core flows pass e2e tests

UX principles
- Minimal taps, large targets, clear hierarchy, fast feedback

Out-of-scope risks
- Health integrations; background timers


