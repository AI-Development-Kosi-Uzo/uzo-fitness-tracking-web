import type { ExerciseTemplate } from '../../data/types'

type Props = { item: ExerciseTemplate }

export function ExerciseTemplateRow(props: Props) {
  const { item } = props
  return (
    <div className="flex items-center justify-between border rounded px-2 py-1 text-sm">
      <div className="truncate">{item.setCount}x{item.reps} {item.weight ? `@ ${item.weight}` : ''}</div>
      <div className="opacity-60">pos {item.position}</div>
    </div>
  )
}


