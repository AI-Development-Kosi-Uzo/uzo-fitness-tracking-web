import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../data/queryKeys'
import { MemoryWorkoutSessionsRepository } from '../../data/repositories/memory/workoutSessions.repo'
import { Calendar } from '../../components/history/Calendar'
import { SessionList } from '../../components/history/SessionList'
import { calculateStreaks } from '../../utils/streaks'

const sessionsRepo = new MemoryWorkoutSessionsRepository()

export default function HistoryRoute() {
  const today = new Date().toISOString().slice(0, 10)
  const [selectedDate, setSelectedDate] = useState<string>(today)

  const { data: sessions, isLoading } = useQuery({
    queryKey: queryKeys.workoutSessions(),
    queryFn: () => sessionsRepo.list(),
  })

  const filtered = useMemo(() => {
    if (!sessions) return []
    return sessions.filter((s) => s.date === selectedDate)
  }, [sessions, selectedDate])

  const streaks = useMemo(() => calculateStreaks(sessions ?? [], selectedDate), [sessions, selectedDate])

  if (isLoading) return <div>Loading History…</div>

  const workoutDates = streaks.workoutDates

  return (
    <div style={{ display: 'grid', gap: 16, padding: 16 }}>
      <header style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>History</h1>
        <div style={{ fontSize: 12, color: '#444' }}>
          Streak: {streaks.streakCount} • Total Days: {streaks.totalWorkoutDays}
        </div>
      </header>

      <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} workoutDates={workoutDates} />

      <section>
        <h2 style={{ fontSize: 16, fontWeight: 600, margin: '8px 0' }}>Sessions on {selectedDate}</h2>
        <SessionList sessions={filtered} />
      </section>
    </div>
  )
}


