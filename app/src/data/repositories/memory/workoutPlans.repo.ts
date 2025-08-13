import type { WorkoutPlan } from '../../types'
import type { WorkoutPlansRepository } from '../contracts'

const seed: WorkoutPlan[] = [
  {
    id: 'wp-1',
    customName: 'PPL Spring Block',
    isActive: true,
    startedAt: new Date().toISOString(),
    durationWeeks: 8,
    notes: '',
    endedAt: null,
    templateId: 'wt-1',
  },
]

export class MemoryWorkoutPlansRepository implements WorkoutPlansRepository {
  private items = new Map<string, WorkoutPlan>(seed.map((p) => [p.id, p]))
  async list() { return Array.from(this.items.values()) }
  async getById(id: string) { return this.items.get(id) }
  async getActive() { return Array.from(this.items.values()).find((p) => p.isActive) }
  async create(input: Omit<WorkoutPlan, 'id'>) {
    const id = crypto.randomUUID()
    const created: WorkoutPlan = { id, ...input }
    this.items.set(id, created)
    return created
  }
  async update(id: string, updates: Partial<Omit<WorkoutPlan, 'id'>>) {
    const existing = this.items.get(id)
    if (!existing) throw new Error('WorkoutPlan not found')
    const updated = { ...existing, ...updates }
    this.items.set(id, updated)
    return updated
  }
  async remove(id: string) { this.items.delete(id) }
}


