import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../data/queryKeys'
import { MemoryWorkoutSessionsRepository } from '../../data/repositories/memory/workoutSessions.repo'
import { MemorySessionExercisesRepository } from '../../data/repositories/memory/sessionExercises.repo'
import { useTimersStore } from '../../state/timers.store'
import { SessionHeader } from '../../components/log/SessionHeader'
import { ExerciseRow } from '../../components/log/ExerciseRow'

const sessionsRepo = new MemoryWorkoutSessionsRepository()
const sessionExercisesRepo = new MemorySessionExercisesRepository()

export const LogSessionPage = () => {
	const { data: today } = useQuery({ queryKey: queryKeys.todaysWorkoutSession(), queryFn: () => sessionsRepo.getToday() })
	const sessionId = today?.id ?? ''
	const { data: sessionExercises } = useQuery({ enabled: !!sessionId, queryKey: queryKeys.sessionExercisesBySessionId(sessionId), queryFn: () => sessionExercisesRepo.listBySessionId(sessionId) })

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
		<div className="p-4 space-y-4">
			<SessionHeader title={title} />
			<div className="grid gap-3">
				{sessionExercises?.map((se) => (
					<ExerciseRow key={se.id} exercise={se} />
				))}
			</div>
		</div>
	)
}