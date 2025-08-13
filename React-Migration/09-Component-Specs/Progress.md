### Progress (ProgressPage, StatsTab, PhotosTab)

Purpose: Trends and photo management.

Props/state
- Query: performedExercises aggregated by week; progressPhotos; optional current weight
- Local: selectedExerciseId, selectedMetric, showImagePicker, compareSelection

Events
- selectExercise(id), toggleMetric(type), addPhoto(angle, file, date?), deletePhoto(id), selectForCompare(id), editPhoto(id, date, manualWeight)

Empty/error/loading
- Show skeletons; empty states for no data

Types
```ts
export interface ExerciseTrend { exerciseId: string; exerciseName: string; maxWeight: number; totalVolume: number; totalSessions: number; totalReps: number; weekStartDate: string; }
export interface ProgressPhoto { id: string; date: string; angle: 'front'|'side'|'back'; assetIdentifier: string; manualWeight?: number; notes: string; }
```


