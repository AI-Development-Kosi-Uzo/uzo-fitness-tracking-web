import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ExercisePicker } from './ExercisePicker'
import type { Exercise } from '../../data/types'

const makeExercises = (): Exercise[] => [
  {
    id: 'ex-1',
    name: 'Bench Press',
    category: 'strength',
    instructions: '',
    mediaAssetId: null,
    lastUsedWeight: null,
    lastUsedReps: null,
    lastTotalVolume: null,
    lastUsedDate: null,
  },
  {
    id: 'ex-2',
    name: 'Squat',
    category: 'strength',
    instructions: '',
    mediaAssetId: null,
    lastUsedWeight: null,
    lastUsedReps: null,
    lastTotalVolume: null,
    lastUsedDate: null,
  },
  {
    id: 'ex-3',
    name: 'Burpees',
    category: 'cardio',
    instructions: '',
    mediaAssetId: null,
    lastUsedWeight: null,
    lastUsedReps: null,
    lastTotalVolume: null,
    lastUsedDate: null,
  },
]

test('shows all exercises initially and filters by query', async () => {
  render(<ExercisePicker exercises={makeExercises()} onSelect={() => {}} />)

  expect(screen.getByText('Bench Press')).toBeInTheDocument()
  expect(screen.getByText('Squat')).toBeInTheDocument()
  expect(screen.getByText('Burpees')).toBeInTheDocument()

  const user = userEvent.setup()
  await user.type(screen.getByPlaceholderText('Search exercises'), 'bench')

  expect(screen.getByText('Bench Press')).toBeInTheDocument()
  expect(screen.queryByText('Squat')).not.toBeInTheDocument()
  expect(screen.queryByText('Burpees')).not.toBeInTheDocument()
})

test('calls onSelect with the chosen exercise', async () => {
  const onSelect = vi.fn()
  render(<ExercisePicker exercises={makeExercises()} onSelect={onSelect} />)

  const user = userEvent.setup()
  await user.click(screen.getByText('Squat'))

  expect(onSelect).toHaveBeenCalledTimes(1)
  expect(onSelect.mock.calls[0][0].name).toBe('Squat')
})