import { useEffect, useState } from 'react'
import type { DayTemplate, ExerciseTemplate, Weekday } from '../../data/types'
import { workoutTemplatesRepo } from '../../routes/library/data'

type Props = {
  workoutTemplateId: string
}

const weekOrder: Weekday[] = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']

export function DayList(props: Props) {
  const { workoutTemplateId } = props
  const [days, setDays] = useState<DayTemplate[]>([])
  const [exercisesByDay, setExercisesByDay] = useState<Record<string, ExerciseTemplate[]>>({})

  useEffect(() => {
    ;(async () => {
      const list = await workoutTemplatesRepo.listDays(workoutTemplateId)
      const sorted = [...list].sort((a, b) => weekOrder.indexOf(a.weekday) - weekOrder.indexOf(b.weekday))
      setDays(sorted)
      const entries = await Promise.all(sorted.map(async (d) => [d.id, await workoutTemplatesRepo.listExercisesByDay(d.id)] as const))
      const map: Record<string, ExerciseTemplate[]> = {}
      for (const [id, arr] of entries) map[id] = arr
      setExercisesByDay(map)
    })()
  }, [workoutTemplateId])

  return (
    <div className="mt-4 grid gap-4">
      {days.map((d) => (
        <div key={d.id} className="border rounded p-3">
          <div className="font-medium capitalize">{d.weekday}{d.isRest ? ' (Rest)' : ''}</div>
          {d.notes && <div className="text-sm text-gray-600">{d.notes}</div>}
          <ul className="mt-2 list-disc pl-5 text-sm">
            {(exercisesByDay[d.id] ?? []).map((et) => (
              <li key={et.id}>{et.setCount}x{et.reps} • #{et.exerciseId}</li>
            ))}
            {(exercisesByDay[d.id] ?? []).length === 0 && <li className="list-none text-gray-500">No exercises</li>}
          </ul>
        </div>
      ))}
    </div>
  )
}


