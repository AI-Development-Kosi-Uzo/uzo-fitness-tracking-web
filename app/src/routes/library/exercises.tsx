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
		<div style={{ paddingBottom: 60 }}>
			<h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Exercises</h1>
			<ExercisePicker exercises={exercises} onSelect={() => {}} />
		</div>
	)
}