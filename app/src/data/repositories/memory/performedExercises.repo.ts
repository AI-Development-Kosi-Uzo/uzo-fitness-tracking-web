import type { PerformedExercise } from '../../types'
import type { PerformedExercisesRepository } from '../contracts'

const seed: PerformedExercise[] = [
  { id: 'pe-1', exerciseId: 'ex-1', workoutSessionId: 'ws-1', performedAt: new Date().toISOString(), reps: 8, weight: 135 },
]

export class MemoryPerformedExercisesRepository implements PerformedExercisesRepository {
  private items = new Map<string, PerformedExercise>(seed.map((p) => [p.id, p]))
  async list() { return Array.from(this.items.values()) }
  async getById(id: string) { return this.items.get(id) }
  async listByWorkoutSessionId(workoutSessionId: string) {
    return Array.from(this.items.values()).filter((p) => p.workoutSessionId === workoutSessionId)
  }
}


