// Centralized React Query keys (string arrays) for consistency

export const queryKeys = {
  exercises: () => ['exercises'] as const,
  exerciseById: (id: string) => ['exercises', id] as const,

  workoutTemplates: () => ['workoutTemplates'] as const,
  workoutTemplateById: (id: string) => ['workoutTemplates', id] as const,
  dayTemplatesByWorkoutTemplateId: (workoutTemplateId: string) => [
    'dayTemplates:byWorkoutTemplateId',
    workoutTemplateId,
  ] as const,
  exerciseTemplatesByDayTemplateId: (dayTemplateId: string) => [
    'exerciseTemplates:byDayTemplateId',
    dayTemplateId,
  ] as const,

  workoutPlans: () => ['workoutPlans'] as const,
  activeWorkoutPlan: () => ['workoutPlans:active'] as const,
  workoutPlanById: (id: string) => ['workoutPlans', id] as const,

  workoutSessions: () => ['workoutSessions'] as const,
  workoutSessionById: (id: string) => ['workoutSessions', id] as const,
  todaysWorkoutSession: () => ['workoutSessions:today'] as const,
  sessionExercisesBySessionId: (sessionId: string) => ['sessionExercises:bySessionId', sessionId] as const,

  completedSetsBySessionExerciseId: (sessionExerciseId: string) => [
    'completedSets:bySessionExerciseId',
    sessionExerciseId,
  ] as const,

  performedExercises: () => ['performedExercises'] as const,
  performedExercisesBySessionId: (workoutSessionId: string) => [
    'performedExercises:byWorkoutSessionId',
    workoutSessionId,
  ] as const,

  progressPhotos: () => ['progressPhotos'] as const,
  progressPhotosByAngle: (angle: 'front' | 'side' | 'back') => [
    'progressPhotos:byAngle',
    angle,
  ] as const,
}

export type QueryKey = ReturnType<
  | typeof queryKeys.exercises
  | typeof queryKeys.exerciseById
  | typeof queryKeys.workoutTemplates
  | typeof queryKeys.workoutTemplateById
  | typeof queryKeys.dayTemplatesByWorkoutTemplateId
  | typeof queryKeys.exerciseTemplatesByDayTemplateId
  | typeof queryKeys.workoutPlans
  | typeof queryKeys.activeWorkoutPlan
  | typeof queryKeys.workoutPlanById
  | typeof queryKeys.workoutSessions
  | typeof queryKeys.workoutSessionById
  | typeof queryKeys.todaysWorkoutSession
  | typeof queryKeys.sessionExercisesBySessionId
  | typeof queryKeys.completedSetsBySessionExerciseId
  | typeof queryKeys.performedExercises
  | typeof queryKeys.performedExercisesBySessionId
  | typeof queryKeys.progressPhotos
  | typeof queryKeys.progressPhotosByAngle
>


