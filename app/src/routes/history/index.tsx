import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../data/queryKeys'
import type { WorkoutSession } from '../../data/types'
import { MemoryWorkoutSessionsRepository } from '../../data/repositories/memory/workoutSessions.repo'
import { Calendar } from '../../components/history/Calendar'
import { SessionList } from '../../components/history/SessionList'

const workoutSessionsRepo = new MemoryWorkoutSessionsRepository()

export function groupSessionsByDate(sessions: WorkoutSession[]): Record<string, WorkoutSession[]> {
  return sessions.reduce<Record<string, WorkoutSession[]>>((acc, s) => {
    const key = s.date
    if (!acc[key]) acc[key] = []
    acc[key].push(s)
    return acc
  }, {})
}

export function computeStreak(dates: string[]): number {
  if (dates.length === 0) return 0
  const set = new Set(dates)
  let streak = 0
  const cursor = new Date()
  while (true) {
    const iso = cursor.toISOString().slice(0, 10)
    if (set.has(iso)) {
      streak += 1
      cursor.setDate(cursor.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}

export const HistoryPage = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(new Date().toISOString().slice(0, 10))

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: queryKeys.workoutSessions(),
    queryFn: async () => workoutSessionsRepo.list(),
  })

  const sessionsByDate = useMemo(() => groupSessionsByDate(sessions), [sessions])
  const datesWithSessions = useMemo(() => Object.keys(sessionsByDate).sort(), [sessionsByDate])
  const streakCount = useMemo(() => computeStreak(datesWithSessions), [datesWithSessions])
  const totalWorkoutDays = datesWithSessions.length

  const daySessions = selectedDate ? (sessionsByDate[selectedDate] ?? []) : []

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-semibold">History</div>
          <div className="text-sm text-gray-600">Streak: {streakCount} • Days trained: {totalWorkoutDays}</div>
        </div>
      </div>

      <Calendar
        datesWithSessions={datesWithSessions}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <div>
        <div className="text-sm font-medium mb-2">Sessions on {selectedDate}</div>
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading…</div>
        ) : (
          <SessionList sessions={daySessions} />
        )}
      </div>
    </div>
  )
}