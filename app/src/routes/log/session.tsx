import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../data/queryKeys'
import { MemoryWorkoutSessionsRepository } from '../../data/repositories/memory/workoutSessions.repo'
import { MemorySessionExercisesRepository } from '../../data/repositories/memory/sessionExercises.repo'
import { MemoryCompletedSetsRepository } from '../../data/repositories/memory/completedSets.repo'
import { useTimersStore } from '../../state/timers.store'
import { SessionHeader } from '../../components/log/SessionHeader'
import { ExerciseRow } from '../../components/log/ExerciseRow'

const sessionsRepo = new MemoryWorkoutSessionsRepository()
const sessionExercisesRepo = new MemorySessionExercisesRepository()
const completedSetsRepo = new MemoryCompletedSetsRepository()

export const LogSessionPage = () => {
	const { data: today } = useQuery({ queryKey: queryKeys.todaysWorkoutSession(), queryFn: () => sessionsRepo.getToday() })
	const sessionId = today?.id ?? ''
	const { data: sessionExercises } = useQuery({ enabled: !!sessionId, queryKey: queryKeys.sessionExercisesBySessionId(sessionId), queryFn: () => sessionExercisesRepo.listBySessionId(sessionId) })
	const setsQueries = (sessionExercises ?? []).map((se) => ({ seId: se.id, q: useQuery({ queryKey: queryKeys.completedSetsBySessionExerciseId(se.id), queryFn: () => completedSetsRepo.listBySessionExerciseId(se.id), enabled: true }) }))

	const { tick } = useTimersStore()

	useEffect(() => {
		let raf: number | null = null
		let last = performance.now()
		const loop = (now: number) => {
			const delta = now - last
			last = now
			tick(delta)
			raf = requestAnimationFrame(loop)
		}
		raf = requestAnimationFrame(loop)
		return () => { if (raf) cancelAnimationFrame(raf) }
	}, [tick])

	const title = useMemo(() => today?.title ?? 'Session', [today])

	return (
		<div style={{ padding: '16px' }}>
			<SessionHeader title={title} />
			<div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
				{sessionExercises?.map((se) => {
					const sets = setsQueries.find((q) => q.seId === se.id)?.q.data ?? []
					return <ExerciseRow key={se.id} exercise={se} sets={sets} />
				})}
			</div>
		</div>
	)
}