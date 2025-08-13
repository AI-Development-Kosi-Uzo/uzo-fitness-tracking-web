// Domain models derived from React-Migration/01-Domain-Models.yml

export type ExerciseCategory = 'strength' | 'cardio' | 'mobility' | 'balance'
export type Weekday = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'
export type PhotoAngle = 'front' | 'side' | 'back'

export interface Exercise {
  id: string
  name: string
  category: ExerciseCategory
  instructions: string
  mediaAssetId: string | null
  lastUsedWeight: number | null
  lastUsedReps: number | null
  lastTotalVolume: number | null
  lastUsedDate: string | null
}

export interface WorkoutTemplate {
  id: string
  name: string
  summary: string
  createdAt: string
}

export interface DayTemplate {
  id: string
  weekday: Weekday
  isRest: boolean
  notes: string
  workoutTemplateId: string
}

export interface ExerciseTemplate {
  id: string
  exerciseId: string
  setCount: number
  reps: number
  weight: number | null
  position: number
  supersetId: string | null
  createdAt: string
  dayTemplateId: string
}

export interface WorkoutPlan {
  id: string
  customName: string
  isActive: boolean
  startedAt: string
  durationWeeks: number
  notes: string
  endedAt: string | null
  templateId: string
}

export interface WorkoutSession {
  id: string
  date: string
  title: string
  duration: number | null
  createdAt: string
  totalVolume: number
  planId: string
}

export interface SessionExercise {
  id: string
  exerciseId: string
  plannedSets: number
  plannedReps: number
  plannedWeight: number | null
  position: number
  supersetId: string | null
  previousTotalVolume: number | null
  previousSessionDate: string | null
  currentSet: number
  isCompleted: boolean
  restTimer: number | null
  createdAt: string
  totalVolume: number
  volumeChange: number | null
  volumeChangePercentage: number | null
  sessionId: string
}

export interface CompletedSet {
  id: string
  reps: number
  weight: number
  isCompleted: boolean
  position: number
  externalSampleId: string | null
  sessionExerciseId: string
}

export interface PerformedExercise {
  id: string
  performedAt: string
  reps: number
  weight: number
  exerciseId: string
  workoutSessionId: string | null
}

export interface ProgressPhoto {
  id: string
  date: string
  angle: PhotoAngle
  assetIdentifier: string
  weightSampleId: string | null
  notes: string
  manualWeight: number | null
  createdAt: string
}


