import { useEffect, useState } from 'react'
import type { Exercise } from '../../data/types'
import { MemoryExercisesRepository } from '../../data/repositories/memory/exercises.repo'
import { ExercisePicker } from '../../components/library/ExercisePicker'

export const LibraryExercisesPage = () => {
	const [exercises, setExercises] = useState<Exercise[]>([])

	useEffect(() => {
		const repo = new MemoryExercisesRepository()
		repo.list().then(setExercises)
	}, [])

	return (
		<div className="pb-16 p-4 space-y-3">
			<h1 className="text-2xl font-semibold tracking-tight">Exercises</h1>
			<ExercisePicker exercises={exercises} onSelect={() => {}} />
		</div>
	)
}