import type { CompletedSet } from '../../types'
import type { CompletedSetsRepository } from '../contracts'

const seed: CompletedSet[] = [
  { id: 'cs-1', sessionExerciseId: 'se-1', reps: 8, weight: 135, isCompleted: true, position: 0, externalSampleId: null },
]

export class MemoryCompletedSetsRepository implements CompletedSetsRepository {
  private items = new Map<string, CompletedSet>(seed.map((s) => [s.id, s]))
  async listBySessionExerciseId(sessionExerciseId: string) {
    return Array.from(this.items.values()).filter((s) => s.sessionExerciseId === sessionExerciseId)
  }
  async getById(id: string) { return this.items.get(id) }
  async create(input: Omit<CompletedSet, 'id'>) {
    const id = crypto.randomUUID()
    const created: CompletedSet = { id, ...input }
    this.items.set(id, created)
    return created
  }
  async update(id: string, updates: Partial<Omit<CompletedSet, 'id'>>) {
    const existing = this.items.get(id)
    if (!existing) throw new Error('CompletedSet not found')
    const updated = { ...existing, ...updates }
    this.items.set(id, updated)
    return updated
  }
  async remove(id: string) { this.items.delete(id) }
}


