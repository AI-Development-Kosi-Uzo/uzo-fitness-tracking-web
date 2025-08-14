import { useEffect, useState } from 'react'
import { useParams } from '@tanstack/react-router'
import type { WorkoutTemplate } from '../../data/types'
import { workoutTemplatesRepo } from './data'
import { DayList } from '../../components/library/DayList'

export default function LibraryTemplateRoute() {
  const { templateId } = useParams({ strict: false }) as { templateId: string }
  const [template, setTemplate] = useState<WorkoutTemplate | null>(null)

  useEffect(() => {
    ;(async () => setTemplate((await workoutTemplatesRepo.getById(templateId)) ?? null))()
  }, [templateId])

  if (!template) return <div className="p-4">Loading template…</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">{template.name}</h1>
      <div className="text-gray-600">{template.summary}</div>
      <DayList workoutTemplateId={template.id} />
    </div>
  )
}


