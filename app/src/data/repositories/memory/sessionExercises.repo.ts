import type { CompletedSet, SessionExercise } from '../../types'
import type { SessionExercisesRepository } from '../contracts'

type Bundle = { sessionExercise: SessionExercise; sets: CompletedSet[] }

const seed: Bundle[] = [
  {
    sessionExercise: { id: 'se-1', sessionId: 'ws-1', exerciseId: 'ex-1', plannedSets: 3, plannedReps: 8, plannedWeight: 135, position: 0, supersetId: null, previousTotalVolume: 1000, previousSessionDate: new Date().toISOString(), currentSet: 1, isCompleted: false, restTimer: null, createdAt: new Date().toISOString(), totalVolume: 0, volumeChange: null, volumeChangePercentage: null },
    sets: [
      { id: 'cs-1', sessionExerciseId: 'se-1', reps: 8, weight: 135, isCompleted: true, position: 0, externalSampleId: null },
    ],
  },
]

export class MemorySessionExercisesRepository implements SessionExercisesRepository {
  private sessionExercises = new Map<string, SessionExercise>()
  private setsBySessionExercise = new Map<string, CompletedSet[]>()

  constructor(seedData: Bundle[] = seed) {
    for (const b of seedData) {
      this.sessionExercises.set(b.sessionExercise.id, b.sessionExercise)
      this.setsBySessionExercise.set(b.sessionExercise.id, b.sets)
    }
  }

  async listBySessionId(sessionId: string) {
    return Array.from(this.sessionExercises.values()).filter((se) => se.sessionId === sessionId)
  }
  async getById(id: string) { return this.sessionExercises.get(id) }
  async create(input: Omit<SessionExercise, 'id' | 'totalVolume' | 'volumeChange' | 'volumeChangePercentage'>) {
    const id = crypto.randomUUID()
    const created: SessionExercise = { id, totalVolume: 0, volumeChange: null, volumeChangePercentage: null, ...input }
    this.sessionExercises.set(id, created)
    this.setsBySessionExercise.set(id, [])
    return created
  }
  async update(id: string, updates: Partial<Omit<SessionExercise, 'id'>>) {
    const existing = this.sessionExercises.get(id)
    if (!existing) throw new Error('SessionExercise not found')
    const updated = { ...existing, ...updates }
    this.sessionExercises.set(id, updated)
    return updated
  }
  async remove(id: string) {
    this.sessionExercises.delete(id)
    this.setsBySessionExercise.delete(id)
  }
  async listCompletedSets(sessionExerciseId: string) {
    return this.setsBySessionExercise.get(sessionExerciseId) ?? []
  }
}


