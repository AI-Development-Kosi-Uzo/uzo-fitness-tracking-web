import { MemoryExercisesRepository } from './memory/exercises.repo'
import { MemoryWorkoutPlansRepository } from './memory/workoutPlans.repo'
import { MemoryWorkoutSessionsRepository } from './memory/workoutSessions.repo'
import { MemorySessionExercisesRepository } from './memory/sessionExercises.repo'
import { MemoryCompletedSetsRepository } from './memory/completedSets.repo'
import { MemoryWorkoutTemplatesRepository } from './memory/workoutTemplates.repo'

export const exercisesRepo = new MemoryExercisesRepository()
export const workoutPlansRepo = new MemoryWorkoutPlansRepository()
export const workoutSessionsRepo = new MemoryWorkoutSessionsRepository()
export const sessionExercisesRepo = new MemorySessionExercisesRepository()
export const completedSetsRepo = new MemoryCompletedSetsRepository()
export const workoutTemplatesRepo = new MemoryWorkoutTemplatesRepository()


