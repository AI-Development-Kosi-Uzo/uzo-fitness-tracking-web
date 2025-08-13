import type {
  CompletedSet,
  DayTemplate,
  Exercise,
  ExerciseTemplate,
  PerformedExercise,
  ProgressPhoto,
  SessionExercise,
  WorkoutPlan,
  WorkoutSession,
  WorkoutTemplate,
} from '../types'

// Generic result type for repository methods
export type Result<T> = Promise<T>

export interface ExercisesRepository {
  list(): Result<Exercise[]>
  getById(id: string): Result<Exercise | undefined>
  create(input: Omit<Exercise, 'id'>): Result<Exercise>
  update(id: string, updates: Partial<Omit<Exercise, 'id'>>): Result<Exercise>
  remove(id: string): Result<void>
}

export interface WorkoutTemplatesRepository {
  list(): Result<WorkoutTemplate[]>
  getById(id: string): Result<WorkoutTemplate | undefined>
  create(input: Omit<WorkoutTemplate, 'id'>): Result<WorkoutTemplate>
  update(id: string, updates: Partial<Omit<WorkoutTemplate, 'id'>>): Result<WorkoutTemplate>
  remove(id: string): Result<void>
  listDays(workoutTemplateId: string): Result<DayTemplate[]>
  listExercisesByDay(dayTemplateId: string): Result<ExerciseTemplate[]>
}

export interface WorkoutPlansRepository {
  list(): Result<WorkoutPlan[]>
  getById(id: string): Result<WorkoutPlan | undefined>
  getActive(): Result<WorkoutPlan | undefined>
  create(input: Omit<WorkoutPlan, 'id'>): Result<WorkoutPlan>
  update(id: string, updates: Partial<Omit<WorkoutPlan, 'id'>>): Result<WorkoutPlan>
  remove(id: string): Result<void>
}

export interface WorkoutSessionsRepository {
  list(): Result<WorkoutSession[]>
  getById(id: string): Result<WorkoutSession | undefined>
  getToday(): Result<WorkoutSession | undefined>
  create(input: Omit<WorkoutSession, 'id' | 'totalVolume'>): Result<WorkoutSession>
  update(id: string, updates: Partial<Omit<WorkoutSession, 'id'>>): Result<WorkoutSession>
  remove(id: string): Result<void>
  listSessionExercises(sessionId: string): Result<SessionExercise[]>
}

export interface SessionExercisesRepository {
  listBySessionId(sessionId: string): Result<SessionExercise[]>
  getById(id: string): Result<SessionExercise | undefined>
  create(input: Omit<SessionExercise, 'id' | 'totalVolume' | 'volumeChange' | 'volumeChangePercentage'>): Result<SessionExercise>
  update(id: string, updates: Partial<Omit<SessionExercise, 'id'>>): Result<SessionExercise>
  remove(id: string): Result<void>
  listCompletedSets(sessionExerciseId: string): Result<CompletedSet[]>
}

export interface CompletedSetsRepository {
  listBySessionExerciseId(sessionExerciseId: string): Result<CompletedSet[]>
  getById(id: string): Result<CompletedSet | undefined>
  create(input: Omit<CompletedSet, 'id'>): Result<CompletedSet>
  update(id: string, updates: Partial<Omit<CompletedSet, 'id'>>): Result<CompletedSet>
  remove(id: string): Result<void>
}

export interface PerformedExercisesRepository {
  list(): Result<PerformedExercise[]>
  getById(id: string): Result<PerformedExercise | undefined>
  listByWorkoutSessionId(workoutSessionId: string): Result<PerformedExercise[]>
}

export interface ProgressPhotosRepository {
  list(): Result<ProgressPhoto[]>
  getById(id: string): Result<ProgressPhoto | undefined>
  listByAngle(angle: 'front' | 'side' | 'back'): Result<ProgressPhoto[]>
  create(input: Omit<ProgressPhoto, 'id'>): Result<ProgressPhoto>
  update(id: string, updates: Partial<Omit<ProgressPhoto, 'id'>>): Result<ProgressPhoto>
  remove(id: string): Result<void>
}


