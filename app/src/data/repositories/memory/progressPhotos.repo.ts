import type { ProgressPhoto } from '../../types'
import type { ProgressPhotosRepository } from '../contracts'

const seed: ProgressPhoto[] = [
  { id: 'pp-1', date: new Date().toISOString().slice(0,10), angle: 'front', assetIdentifier: '/public/vite.svg', weightSampleId: null, notes: '', manualWeight: 185, createdAt: new Date().toISOString() },
]

export class MemoryProgressPhotosRepository implements ProgressPhotosRepository {
  private items = new Map<string, ProgressPhoto>(seed.map((p) => [p.id, p]))
  async list() { return Array.from(this.items.values()) }
  async getById(id: string) { return this.items.get(id) }
  async listByAngle(angle: 'front' | 'side' | 'back') {
    return Array.from(this.items.values()).filter((p) => p.angle === angle)
  }
  async create(input: Omit<ProgressPhoto, 'id'>) {
    const id = crypto.randomUUID()
    const created: ProgressPhoto = { id, ...input }
    this.items.set(id, created)
    return created
  }
  async update(id: string, updates: Partial<Omit<ProgressPhoto, 'id'>>) {
    const existing = this.items.get(id)
    if (!existing) throw new Error('ProgressPhoto not found')
    const updated = { ...existing, ...updates }
    this.items.set(id, updated)
    return updated
  }
  async remove(id: string) { this.items.delete(id) }
}


