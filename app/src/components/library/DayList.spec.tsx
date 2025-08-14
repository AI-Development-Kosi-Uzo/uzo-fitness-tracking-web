import { render, screen } from '@testing-library/react'
import { DayList } from './DayList'
import type { DayTemplate, Exercise, ExerciseTemplate } from '../../data/types'

const day = (overrides: Partial<DayTemplate> = {}): DayTemplate => ({
  id: crypto.randomUUID(),
  weekday: 'monday',
  isRest: false,
  notes: '',
  workoutTemplateId: 'wt-1',
  ...overrides,
})

const et = (overrides: Partial<ExerciseTemplate> = {}): ExerciseTemplate => ({
  id: crypto.randomUUID(),
  dayTemplateId: 'dt-1',
  exerciseId: 'ex-1',
  setCount: 3,
  reps: 8,
  weight: 100,
  position: 0,
  supersetId: null,
  createdAt: new Date().toISOString(),
  ...overrides,
})

const ex: Exercise = {
  id: 'ex-1',
  name: 'Bench Press',
  category: 'strength',
  instructions: '',
  mediaAssetId: null,
  lastUsedWeight: null,
  lastUsedReps: null,
  lastTotalVolume: null,
  lastUsedDate: null,
}

test('renders day sections and indicates rest days', () => {
  render(
    <DayList
      days={[day({ id: 'd1', weekday: 'monday' }), day({ id: 'd2', weekday: 'friday', isRest: true })]}
      exercisesByDayId={{}}
      exercisesIndex={new Map([[ex.id, ex]])}
    />,
  )
  expect(screen.getByText('monday')).toBeInTheDocument()
  expect(screen.getByText('friday')).toBeInTheDocument()
  expect(screen.getByText('Rest')).toBeInTheDocument()
})

test('renders exercise rows ordered by position', () => {
  const d = day({ id: 'd1' })
  const a = et({ id: 'a', dayTemplateId: 'd1', position: 1, exerciseId: ex.id })
  const b = et({ id: 'b', dayTemplateId: 'd1', position: 0, exerciseId: ex.id })

  render(
    <DayList
      days={[d]}
      exercisesByDayId={{ d1: [a, b] }}
      exercisesIndex={new Map([[ex.id, ex]])}
    />,
  )

  const rows = screen.getAllByText('Bench Press')
  // First rendered should correspond to b (position 0), then a (position 1)
  expect(rows).toHaveLength(2)
})