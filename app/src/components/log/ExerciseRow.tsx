import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../data/queryKeys'
import { MemoryCompletedSetsRepository } from '../../data/repositories/memory/completedSets.repo'
import type { SessionExercise } from '../../data/types'

const completedSetsRepo = new MemoryCompletedSetsRepository()

export function ExerciseRow({ exercise }: { exercise: SessionExercise }) {
	const { data: sets } = useQuery({ queryKey: queryKeys.completedSetsBySessionExerciseId(exercise.id), queryFn: () => completedSetsRepo.listBySessionExerciseId(exercise.id) })
	return (
		<div className="rounded-2xl bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.08),0_10px_20px_-10px_rgba(0,0,0,0.25)] p-3">
			<div className="font-semibold text-sm">Exercise {exercise.exerciseId}</div>
			<div className="text-xs text-gray-600">Set {exercise.currentSet}/{exercise.plannedSets}</div>
			{(sets?.length ?? 0) > 0 && (
				<ol className="pl-4 mt-2 space-y-1 list-decimal">
					{sets!.map((s) => (
						<li key={s.id} className="text-sm">Set {s.position + 1}: {s.reps} reps @ {s.weight} lb</li>
					))}
				</ol>
			)}
		</div>
	)
}