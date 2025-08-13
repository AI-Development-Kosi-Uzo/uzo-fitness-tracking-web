### Logging (LogPage, SessionModal)

Purpose: Start/resume a workout session, log sets/reps/weight, rest timers, supersets.

Props/state
- Query: active plan, day templates, today session (if any)
- Zustand: `workoutTimer`, `restTimerByExerciseId`, `currentExerciseIndex`, `showSessionModal`

Events
- startSession(), editSet(exerciseId, setIndex, reps, weight), addSet(exerciseId), toggleSetCompletion(exerciseId, setIndex), startRest(exerciseId, seconds), finishSession()

Validation
- Cannot finish unless all exercises complete; show toast otherwise

Layout (mobile)
- Tabs bar bottom, page header with plan/day selector
- List of exercises grouped by `supersetId`
- Floating action to open SessionModal

Types
```ts
export interface CompletedSet { id: string; reps: number; weight: number; isCompleted: boolean; position: number; }
export interface SessionExerciseUI { id: string; name: string; sets: CompletedSet[]; plannedSets: number; plannedReps: number; plannedWeight?: number; currentSet: number; timerRemaining?: number; isSupersetHead: boolean; isCompleted: boolean; position: number; supersetId?: string; }
```


