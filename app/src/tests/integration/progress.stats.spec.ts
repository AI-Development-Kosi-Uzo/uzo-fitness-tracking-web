import { describe, expect, it } from 'vitest'
import { aggregateExerciseTrends } from '../../routes/progress/stats'
import type { PerformedExercise } from '../../data/types'

describe('aggregateExerciseTrends', () => {
  it('groups by exercise and week, computing totals and max', () => {
    const performed: PerformedExercise[] = [
      { id: '1', exerciseId: 'ex-1', workoutSessionId: 'ws-1', performedAt: '2025-01-06T10:00:00.000Z', reps: 8, weight: 100 },
      { id: '2', exerciseId: 'ex-1', workoutSessionId: 'ws-1', performedAt: '2025-01-06T10:05:00.000Z', reps: 6, weight: 120 },
      { id: '3', exerciseId: 'ex-2', workoutSessionId: 'ws-2', performedAt: '2025-01-08T10:00:00.000Z', reps: 10, weight: 50 },
      { id: '4', exerciseId: 'ex-1', workoutSessionId: 'ws-3', performedAt: '2025-01-15T10:00:00.000Z', reps: 5, weight: 130 },
    ]
    const map = { 'ex-1': 'Bench', 'ex-2': 'Row' }
    const trends = aggregateExerciseTrends(performed, map)

    // Expect two weeks for ex-1, one week for ex-2
    expect(trends.length).toBe(3)

    const week1Bench = trends.find((t) => t.exerciseId === 'ex-1' && t.weekStartDate === '2025-01-05')
    expect(week1Bench).toBeDefined()
    expect(week1Bench!.maxWeight).toBe(120)
    expect(week1Bench!.totalVolume).toBe(100 * 8 + 120 * 6)
    expect(week1Bench!.totalReps).toBe(8 + 6)

    const week2Bench = trends.find((t) => t.exerciseId === 'ex-1' && t.weekStartDate === '2025-01-12')
    expect(week2Bench).toBeDefined()
    expect(week2Bench!.maxWeight).toBe(130)
    expect(week2Bench!.totalVolume).toBe(130 * 5)
  })
})


