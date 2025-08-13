import type { SessionExercise, WorkoutSession } from '../../types'
import type { WorkoutSessionsRepository } from '../contracts'

type Bundle = { session: WorkoutSession; sessionExercises: SessionExercise[] }

const todayIso = new Date().toISOString().slice(0, 10)

const seed: Bundle[] = [
  {
    session: {
      id: 'ws-1',
      date: todayIso,
      title: 'Push Day',
      duration: null,
      createdAt: new Date().toISOString(),
      totalVolume: 1080,
      planId: 'wp-1',
    },
    sessionExercises: [
      { id: 'se-1', sessionId: 'ws-1', exerciseId: 'ex-1', plannedSets: 3, plannedReps: 8, plannedWeight: 135, position: 0, supersetId: null, previousTotalVolume: 1000, previousSessionDate: todayIso, currentSet: 1, isCompleted: false, restTimer: null, createdAt: new Date().toISOString(), totalVolume: 0, volumeChange: null, volumeChangePercentage: null },
    ],
  },
]

export class MemoryWorkoutSessionsRepository implements WorkoutSessionsRepository {
  private sessions = new Map<string, WorkoutSession>()
  private exercisesBySession = new Map<string, SessionExercise[]>()

  constructor(seedData: Bundle[] = seed) {
    for (const b of seedData) {
      this.sessions.set(b.session.id, b.session)
      this.exercisesBySession.set(b.session.id, b.sessionExercises)
    }
  }

  async list() { return Array.from(this.sessions.values()) }
  async getById(id: string) { return this.sessions.get(id) }
  async getToday() { return Array.from(this.sessions.values()).find((s) => s.date === todayIso) }
  async create(input: Omit<WorkoutSession, 'id' | 'totalVolume'>) {
    const id = crypto.randomUUID()
    const created: WorkoutSession = { id, totalVolume: 0, ...input }
    this.sessions.set(id, created)
    this.exercisesBySession.set(id, [])
    return created
  }
  async update(id: string, updates: Partial<Omit<WorkoutSession, 'id'>>) {
    const existing = this.sessions.get(id)
    if (!existing) throw new Error('WorkoutSession not found')
    const updated = { ...existing, ...updates }
    this.sessions.set(id, updated)
    return updated
  }
  async remove(id: string) { this.sessions.delete(id); this.exercisesBySession.delete(id) }
  async listSessionExercises(sessionId: string) { return this.exercisesBySession.get(sessionId) ?? [] }
}


