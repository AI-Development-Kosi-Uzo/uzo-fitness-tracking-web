import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../data/queryKeys'
import { MemoryCompletedSetsRepository } from '../../data/repositories/memory/completedSets.repo'
import type { SessionExercise } from '../../data/types'

const completedSetsRepo = new MemoryCompletedSetsRepository()

export function ExerciseRow({ exercise }: { exercise: SessionExercise }) {
	const { data: sets } = useQuery({ queryKey: queryKeys.completedSetsBySessionExerciseId(exercise.id), queryFn: () => completedSetsRepo.listBySessionExerciseId(exercise.id) })
	return (
		<div style={{ border: '1px solid #eee', padding: 8, borderRadius: 8 }}>
			<div style={{ fontWeight: 600 }}>Exercise {exercise.exerciseId}</div>
			<div style={{ color: '#666' }}>Set {exercise.currentSet}/{exercise.plannedSets}</div>
			{(sets?.length ?? 0) > 0 && (
				<ol style={{ paddingLeft: 16 }}>
					{sets!.map((s) => (
						<li key={s.id}>Set {s.position + 1}: {s.reps} reps @ {s.weight} lb</li>
					))}
				</ol>
			)}
		</div>
	)
}