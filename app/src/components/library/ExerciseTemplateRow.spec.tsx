import { render, screen } from '@testing-library/react'
import { ExerciseTemplateRow } from './ExerciseTemplateRow'
import type { Exercise, ExerciseTemplate } from '../../data/types'

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

const et = (overrides: Partial<ExerciseTemplate> = {}): ExerciseTemplate => ({
  id: 'et-1',
  exerciseId: 'ex-1',
  setCount: 3,
  reps: 8,
  weight: 135,
  position: 1,
  supersetId: null,
  createdAt: new Date().toISOString(),
  dayTemplateId: 'dt-1',
  ...overrides,
})

test('renders exercise name, sets, reps, weight, and position', () => {
  render(<ExerciseTemplateRow exerciseTemplate={et()} exercise={ex} />)
  expect(screen.getByText('Bench Press')).toBeInTheDocument()
  expect(screen.getByText(/x3 sets/)).toBeInTheDocument()
  expect(screen.getByText(/8 reps/)).toBeInTheDocument()
  expect(screen.getByText(/135 lb/)).toBeInTheDocument()
  expect(screen.getByText('#2')).toBeInTheDocument()
})

test('handles missing exercise gracefully', () => {
  render(<ExerciseTemplateRow exerciseTemplate={et()} exercise={undefined} />)
  expect(screen.getByText('Unknown Exercise')).toBeInTheDocument()
})