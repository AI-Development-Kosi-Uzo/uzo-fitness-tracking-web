import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../data/queryKeys'
import { MemoryWorkoutSessionsRepository } from '../../data/repositories/memory/workoutSessions.repo'
import { Calendar } from '../../components/history/Calendar'
import { SessionList } from '../../components/history/SessionList'
import { computeStreak, groupSessionsByDate } from './utils'

const workoutSessionsRepo = new MemoryWorkoutSessionsRepository()

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
    <div className="p-4 pb-16 flex flex-col gap-4">
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