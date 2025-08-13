import type { DayTemplate, ExerciseTemplate, WorkoutTemplate } from '../../types'
import type { WorkoutTemplatesRepository } from '../contracts'

type TemplateBundle = {
  template: WorkoutTemplate
  days: DayTemplate[]
  dayExercises: Record<string, ExerciseTemplate[]>
}

const seed: TemplateBundle[] = [
  {
    template: {
      id: 'wt-1',
      name: 'Push/Pull/Legs',
      summary: 'Classic 3-day split',
      createdAt: new Date().toISOString(),
    },
    days: [
      { id: 'dt-1', weekday: 'monday', isRest: false, notes: 'Push day', workoutTemplateId: 'wt-1' },
      { id: 'dt-2', weekday: 'wednesday', isRest: false, notes: 'Pull day', workoutTemplateId: 'wt-1' },
      { id: 'dt-3', weekday: 'friday', isRest: false, notes: 'Legs day', workoutTemplateId: 'wt-1' },
    ],
    dayExercises: {
      'dt-1': [
        { id: 'et-1', dayTemplateId: 'dt-1', exerciseId: 'ex-1', setCount: 3, reps: 8, weight: 135, position: 0, supersetId: null, createdAt: new Date().toISOString() },
      ],
      'dt-2': [],
      'dt-3': [],
    },
  },
]

export class MemoryWorkoutTemplatesRepository implements WorkoutTemplatesRepository {
  private templates = new Map<string, WorkoutTemplate>()
  private days = new Map<string, DayTemplate>()
  private exercisesByDay = new Map<string, ExerciseTemplate[]>()

  constructor(seedData: TemplateBundle[] = seed) {
    for (const b of seedData) {
      this.templates.set(b.template.id, b.template)
      for (const d of b.days) this.days.set(d.id, d)
      for (const [dayId, list] of Object.entries(b.dayExercises)) this.exercisesByDay.set(dayId, list)
    }
  }

  async list() { return Array.from(this.templates.values()) }
  async getById(id: string) { return this.templates.get(id) }
  async create(input: Omit<WorkoutTemplate, 'id'>) {
    const id = crypto.randomUUID()
    const created: WorkoutTemplate = { id, ...input }
    this.templates.set(id, created)
    return created
  }
  async update(id: string, updates: Partial<Omit<WorkoutTemplate, 'id'>>) {
    const existing = this.templates.get(id)
    if (!existing) throw new Error('WorkoutTemplate not found')
    const updated = { ...existing, ...updates }
    this.templates.set(id, updated)
    return updated
  }
  async remove(id: string) {
    this.templates.delete(id)
  }
  async listDays(workoutTemplateId: string) {
    return Array.from(this.days.values()).filter((d) => d.workoutTemplateId === workoutTemplateId)
  }
  async listExercisesByDay(dayTemplateId: string) {
    return this.exercisesByDay.get(dayTemplateId) ?? []
  }
}


