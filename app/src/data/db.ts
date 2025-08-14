import Dexie from 'dexie'
import type { Table } from 'dexie'
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
} from './types'

export class UzoDb extends Dexie {
  exercises!: Table<Exercise, string>
  workoutTemplates!: Table<WorkoutTemplate, string>
  dayTemplates!: Table<DayTemplate, string>
  exerciseTemplates!: Table<ExerciseTemplate, string>
  workoutPlans!: Table<WorkoutPlan, string>
  workoutSessions!: Table<WorkoutSession, string>
  sessionExercises!: Table<SessionExercise, string>
  completedSets!: Table<CompletedSet, string>
  performedExercises!: Table<PerformedExercise, string>
  progressPhotos!: Table<ProgressPhoto, string>

  constructor() {
    super('uzofitness')
    this.version(1).stores({
      exercises: 'id,name',
      workoutTemplates: 'id,name,createdAt',
      dayTemplates: 'id,weekday,workoutTemplateId',
      exerciseTemplates: 'id,dayTemplateId,exerciseId,supersetId,position',
      workoutPlans: 'id,isActive,startedAt,templateId',
      workoutSessions: 'id,date,planId',
      sessionExercises: 'id,sessionId,exerciseId,supersetId,position',
      completedSets: 'id,sessionExerciseId,position',
      performedExercises: 'id,exerciseId,workoutSessionId,performedAt',
      progressPhotos: 'id,date,angle',
    })

    // Populate hook will seed initial dev data
    this.on('populate', async () => {
      const { seedDevData } = await import('./seed')
      await seedDevData()
    })
  }
}

export const db = new UzoDb()


