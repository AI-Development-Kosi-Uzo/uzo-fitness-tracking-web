import { useEffect, useMemo, useState } from 'react'
import type { DayTemplate, Exercise, ExerciseTemplate, WorkoutTemplate } from '../../data/types'
import { DayList } from './DayList'
import { MemoryWorkoutTemplatesRepository } from '../../data/repositories/memory/workoutTemplates.repo'
import { MemoryExercisesRepository } from '../../data/repositories/memory/exercises.repo'

interface TemplateEditorProps {
	templateId: string
}

export function TemplateEditor(props: TemplateEditorProps) {
	const { templateId } = props
	const [template, setTemplate] = useState<WorkoutTemplate | undefined>(undefined)
	const [days, setDays] = useState<DayTemplate[]>([])
	const [exercisesByDayId, setExercisesByDayId] = useState<Record<string, ExerciseTemplate[]>>({})
	const [exercises, setExercises] = useState<Exercise[]>([])

	useEffect(() => {
		const templatesRepo = new MemoryWorkoutTemplatesRepository()
		const exercisesRepo = new MemoryExercisesRepository()
		;(async () => {
			const t = await templatesRepo.getById(templateId)
			setTemplate(t)
			const d = await templatesRepo.listDays(templateId)
			setDays(d)
			const entries = await Promise.all(d.map(async (day) => [day.id, await templatesRepo.listExercisesByDay(day.id)] as const))
			setExercisesByDayId(Object.fromEntries(entries))
			const ex = await exercisesRepo.list()
			setExercises(ex)
		})()
	}, [templateId])

	const exercisesIndex = useMemo(() => new Map(exercises.map((e) => [e.id, e] as const)), [exercises])

	if (!template) return <div>Loading template...</div>

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
			<header>
				<h2 style={{ fontSize: 20, fontWeight: 700 }}>{template.name}</h2>
				<p style={{ color: '#666' }}>{template.summary}</p>
			</header>
			<DayList days={days} exercisesByDayId={exercisesByDayId} exercisesIndex={exercisesIndex} />
		</div>
	)
}