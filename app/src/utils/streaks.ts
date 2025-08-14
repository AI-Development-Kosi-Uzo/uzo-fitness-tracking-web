import type { WorkoutSession } from '../data/types'

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function extractWorkoutDatesFromSessions(sessions: WorkoutSession[]): string[] {
  const set = new Set(sessions.map((s) => s.date))
  return Array.from(set).sort()
}

export function getConsecutiveDayStreak(workoutDates: string[], upToDate?: string): number {
  if (workoutDates.length === 0) return 0
  const dates = new Set(workoutDates)
  const start = upToDate ?? toIsoDate(new Date())
  let current = new Date(start + 'T00:00:00')
  let streak = 0

  while (dates.has(toIsoDate(current))) {
    streak += 1
    current.setDate(current.getDate() - 1)
  }
  return streak
}

export function getTotalWorkoutDays(workoutDates: string[]): number {
  return new Set(workoutDates).size
}

export function calculateStreaks(sessions: WorkoutSession[], upToDate?: string) {
  const workoutDates = extractWorkoutDatesFromSessions(sessions)
  return {
    workoutDates,
    streakCount: getConsecutiveDayStreak(workoutDates, upToDate),
    totalWorkoutDays: getTotalWorkoutDays(workoutDates),
  }
}


