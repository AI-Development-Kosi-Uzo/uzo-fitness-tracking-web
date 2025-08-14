import { describe, it, expect } from 'vitest'
import { calculateStreaks, getConsecutiveDayStreak } from '../../utils/streaks'
import type { WorkoutSession } from '../../data/types'

function sessionFor(date: string): WorkoutSession {
  return { id: crypto.randomUUID(), date, title: 'Test', duration: null, createdAt: date + 'T00:00:00', totalVolume: 0, planId: 'wp-1' }
}

describe('streak utilities', () => {
  it('computes total unique workout days', () => {
    const sessions: WorkoutSession[] = [
      sessionFor('2025-01-01'),
      sessionFor('2025-01-01'),
      sessionFor('2025-01-02'),
    ]
    const { totalWorkoutDays } = calculateStreaks(sessions)
    expect(totalWorkoutDays).toBe(2)
  })

  it('computes streak up to a given date', () => {
    const sessions: WorkoutSession[] = [
      sessionFor('2025-01-01'),
      sessionFor('2025-01-02'),
      sessionFor('2025-01-04'),
    ]
    const upTo = '2025-01-02'
    const { streakCount } = calculateStreaks(sessions, upTo)
    expect(streakCount).toBe(2)
  })

  it('streak is zero when no session on the upToDate', () => {
    const dates = ['2025-01-01', '2025-01-02']
    expect(getConsecutiveDayStreak(dates, '2025-01-05')).toBe(0)
  })
})


