import { MemoryExercisesRepository } from '../../data/repositories/memory/exercises.repo'
import { MemoryWorkoutTemplatesRepository } from '../../data/repositories/memory/workoutTemplates.repo'

// Singleton in-memory repositories for Library pages
export const exercisesRepo = new MemoryExercisesRepository()
export const workoutTemplatesRepo = new MemoryWorkoutTemplatesRepository()


