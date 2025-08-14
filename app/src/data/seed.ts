import { db } from './db'
import type { Exercise, WorkoutTemplate, DayTemplate, ExerciseTemplate, WorkoutPlan, WorkoutSession, SessionExercise, ProgressPhoto } from './types'

export async function seedDevData() {
  // Avoid reseeding if data exists
  const existingExercises = await db.exercises.count()
  if (existingExercises > 0) return

  const now = new Date().toISOString()
  const today = new Date().toISOString().slice(0, 10)

  const exercises: Exercise[] = [
    { id: 'ex-1', name: 'Bench Press', category: 'strength', instructions: 'Lie on bench and press barbell upward.', mediaAssetId: null, lastUsedWeight: 135, lastUsedReps: 8, lastTotalVolume: 1080, lastUsedDate: now },
    { id: 'ex-2', name: 'Squat', category: 'strength', instructions: 'Barbell back squat to parallel.', mediaAssetId: null, lastUsedWeight: 185, lastUsedReps: 5, lastTotalVolume: 925, lastUsedDate: now },
  ]

  const template: WorkoutTemplate = { id: 'wt-1', name: 'Push/Pull/Legs', summary: 'Classic 3-day split', createdAt: now }
  const days: DayTemplate[] = [
    { id: 'dt-1', weekday: 'monday', isRest: false, notes: 'Push day', workoutTemplateId: 'wt-1' },
    { id: 'dt-2', weekday: 'wednesday', isRest: false, notes: 'Pull day', workoutTemplateId: 'wt-1' },
    { id: 'dt-3', weekday: 'friday', isRest: false, notes: 'Legs day', workoutTemplateId: 'wt-1' },
  ]
  const exerciseTemplates: ExerciseTemplate[] = [
    { id: 'et-1', dayTemplateId: 'dt-1', exerciseId: 'ex-1', setCount: 3, reps: 8, weight: 135, position: 0, supersetId: null, createdAt: now },
  ]

  const plan: WorkoutPlan = { id: 'wp-1', customName: 'PPL Spring Block', isActive: true, startedAt: now, durationWeeks: 8, notes: '', endedAt: null, templateId: 'wt-1' }

  const session: WorkoutSession = { id: 'ws-1', date: today, title: 'Push Day', duration: null, createdAt: now, totalVolume: 1080, planId: 'wp-1' }
  const sessionExercises: SessionExercise[] = [
    { id: 'se-1', sessionId: 'ws-1', exerciseId: 'ex-1', plannedSets: 3, plannedReps: 8, plannedWeight: 135, position: 0, supersetId: null, previousTotalVolume: 1000, previousSessionDate: today, currentSet: 1, isCompleted: false, restTimer: null, createdAt: now, totalVolume: 0, volumeChange: null, volumeChangePercentage: null },
  ]

  const photos: ProgressPhoto[] = [
    { id: 'ph-1', date: today, angle: 'front', assetIdentifier: 'demo', weightSampleId: null, notes: 'Start', manualWeight: 180, createdAt: now },
  ]

  await db.transaction('rw', [
    db.exercises,
    db.workoutTemplates,
    db.dayTemplates,
    db.exerciseTemplates,
    db.workoutPlans,
    db.workoutSessions,
    db.sessionExercises,
    db.progressPhotos,
  ], async () => {
    await db.exercises.bulkAdd(exercises)
    await db.workoutTemplates.add(template)
    await db.dayTemplates.bulkAdd(days)
    await db.exerciseTemplates.bulkAdd(exerciseTemplates)
    await db.workoutPlans.add(plan)
    await db.workoutSessions.add(session)
    await db.sessionExercises.bulkAdd(sessionExercises)
    await db.progressPhotos.bulkAdd(photos)
  })
}


