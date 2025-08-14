import type { SessionExercise, CompletedSet } from '../../data/types'

export function ExerciseRow({ exercise, sets }: { exercise: SessionExercise; sets: CompletedSet[] }) {
	return (
		<div style={{ border: '1px solid #eee', padding: 8, borderRadius: 8 }}>
			<div style={{ fontWeight: 600 }}>Exercise {exercise.exerciseId}</div>
			<div style={{ color: '#666' }}>Set {exercise.currentSet}/{exercise.plannedSets}</div>
			{sets.length > 0 && (
				<ol style={{ paddingLeft: 16 }}>
					{sets.map((s) => (
						<li key={s.id}>Set {s.position + 1}: {s.reps} reps @ {s.weight} lb</li>
					))}
				</ol>
			)}
		</div>
	)
}