import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { WorkoutSession } from '../data/types'
import { computeStreak, groupSessionsByDate } from './utils'

function iso(d: Date) {
  return d.toISOString().slice(0, 10)
}

describe('History utilities', () => {
  const RealDate = Date
  beforeEach(() => {
    const fixed = new RealDate('2024-04-10T12:00:00.000Z')
    vi.useFakeTimers()
    vi.setSystemTime(fixed)
  })

  it('groups sessions by date', () => {
    const sessions: WorkoutSession[] = [
      { id: 'a', date: '2024-04-09', title: 'Push', duration: null, createdAt: 'x', totalVolume: 100, planId: 'p' },
      { id: 'b', date: '2024-04-09', title: 'Pull', duration: null, createdAt: 'x', totalVolume: 120, planId: 'p' },
      { id: 'c', date: '2024-04-08', title: 'Legs', duration: null, createdAt: 'x', totalVolume: 140, planId: 'p' },
    ]
    const grouped = groupSessionsByDate(sessions)
    expect(Object.keys(grouped).sort()).toEqual(['2024-04-08', '2024-04-09'])
    expect(grouped['2024-04-09']).toHaveLength(2)
    expect(grouped['2024-04-08']).toHaveLength(1)
  })

  it('computes streak starting from today going backwards', () => {
    const today = new Date()
    const d0 = iso(today) // 2024-04-10
    const d1 = iso(new Date('2024-04-09T00:00:00.000Z'))
    const d2 = iso(new Date('2024-04-08T00:00:00.000Z'))
    expect(computeStreak([d0, d1, d2])).toBe(3)
  })

  it('computes streak with a break', () => {
    const today = new Date()
    const d0 = iso(today) // 2024-04-10
    const d2 = iso(new Date('2024-04-08T00:00:00.000Z'))
    expect(computeStreak([d0, d2])).toBe(1)
  })

  it('returns 0 when no dates', () => {
    expect(computeStreak([])).toBe(0)
  })
})