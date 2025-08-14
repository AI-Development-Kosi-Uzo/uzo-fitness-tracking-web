import type { CompletedSet } from '../../data/types'

export function SetRow({ set }: { set: CompletedSet }) {
	return (
		<div>
			Set {set.position + 1}: {set.reps} reps @ {set.weight} lb
		</div>
	)
}