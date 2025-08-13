import type { Exercise } from '../../types'
import type { ExercisesRepository } from '../contracts'

const seedExercises: Exercise[] = [
  {
    id: 'ex-1',
    name: 'Bench Press',
    category: 'strength',
    instructions: 'Lie on bench and press barbell upward.',
    mediaAssetId: null,
    lastUsedWeight: 135,
    lastUsedReps: 8,
    lastTotalVolume: 1080,
    lastUsedDate: new Date().toISOString(),
  },
  {
    id: 'ex-2',
    name: 'Squat',
    category: 'strength',
    instructions: 'Barbell back squat to parallel.',
    mediaAssetId: null,
    lastUsedWeight: 185,
    lastUsedReps: 5,
    lastTotalVolume: 925,
    lastUsedDate: new Date().toISOString(),
  },
]

export class MemoryExercisesRepository implements ExercisesRepository {
  private items: Map<string, Exercise>
  constructor(seed: Exercise[] = seedExercises) {
    this.items = new Map(seed.map((e) => [e.id, e]))
  }
  async list() { return Array.from(this.items.values()) }
  async getById(id: string) { return this.items.get(id) }
  async create(input: Omit<Exercise, 'id'>) {
    const id = crypto.randomUUID()
    const created: Exercise = { id, ...input }
    this.items.set(id, created)
    return created
  }
  async update(id: string, updates: Partial<Omit<Exercise, 'id'>>) {
    const existing = this.items.get(id)
    if (!existing) throw new Error('Exercise not found')
    const updated = { ...existing, ...updates }
    this.items.set(id, updated)
    return updated
  }
  async remove(id: string) {
    this.items.delete(id)
  }
}


