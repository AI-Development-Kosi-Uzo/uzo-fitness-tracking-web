import { useEffect, useMemo, useState } from 'react'
import Chart from '../../components/progress/Chart'
import type { PerformedExercise } from '../../data/types'
import { MemoryPerformedExercisesRepository } from '../../data/repositories/memory/performedExercises.repo'
import { MemoryExercisesRepository } from '../../data/repositories/memory/exercises.repo'

export interface ExerciseTrend {
  exerciseId: string
  exerciseName: string
  maxWeight: number
  totalVolume: number
  totalSessions: number
  totalReps: number
  weekStartDate: string
}

function getWeekStart(dateIso: string): string {
  const d = new Date(dateIso)
  const day = d.getDay() // 0 = Sunday
  const diff = d.getDate() - day
  const start = new Date(d)
  start.setDate(diff)
  start.setHours(0, 0, 0, 0)
  return start.toISOString().slice(0, 10)
}

export function aggregateExerciseTrends(
  performed: PerformedExercise[],
  exerciseIdToName: Record<string, string> = {},
): ExerciseTrend[] {
  const grouped = new Map<string, ExerciseTrend>()

  for (const p of performed) {
    const weekStartDate = getWeekStart(p.performedAt)
    const key = `${p.exerciseId}__${weekStartDate}`
    const exerciseName = exerciseIdToName[p.exerciseId] ?? p.exerciseId

    if (!grouped.has(key)) {
      grouped.set(key, {
        exerciseId: p.exerciseId,
        exerciseName,
        maxWeight: p.weight,
        totalVolume: p.weight * p.reps,
        totalSessions: p.workoutSessionId ? 1 : 0,
        totalReps: p.reps,
        weekStartDate,
      })
    } else {
      const g = grouped.get(key)!
      g.maxWeight = Math.max(g.maxWeight, p.weight)
      g.totalVolume += p.weight * p.reps
      g.totalReps += p.reps
      if (p.workoutSessionId) {
        // Approximate: count each PerformedExercise as a session occurrence
        g.totalSessions += 1
      }
    }
  }

  return Array.from(grouped.values()).sort((a, b) => a.weekStartDate.localeCompare(b.weekStartDate))
}

export function ProgressStatsPage() {
  const [rows, setRows] = useState<ExerciseTrend[] | null>(null)

  useEffect(() => {
    const repo = new MemoryPerformedExercisesRepository()
    const exRepo = new MemoryExercisesRepository()
    ;(async () => {
      const [performed, exercises] = await Promise.all([repo.list(), exRepo.list()])
      const map = Object.fromEntries(exercises.map((e) => [e.id, e.name]))
      const trends = aggregateExerciseTrends(performed, map)
      setRows(trends)
    })()
  }, [])

  const content = useMemo(() => {
    if (!rows) return <div>Loading…</div>
    if (rows.length === 0) return <div>No data yet</div>

    return <Chart data={rows} />
  }, [rows])

  return (
    <div>
      <h1>Progress - Stats</h1>
      {content}
    </div>
  )
}

export default ProgressStatsPage


