### Library (LibraryPage, TemplateEditorPage)

Purpose: Manage templates, exercises, and activate/deactivate plans.

Props/state
- Query: templates, exercises, workoutPlans, activePlan
- Local: sheet toggles, drag state

Events
- createTemplate(name), duplicateTemplate(id), deleteTemplate(id)
- createExercise(name, category, instructions, mediaAssetId?)
- updateExerciseTemplate(id, setCount, reps, weight?, supersetId?)
- reorderExerciseTemplates(dayId, fromIndex, toIndex)
- activatePlan(templateId, customName, startDate)

Validation
- Unique exercise names; setCount/reps >= 1

Wireframe
- Segmented: Workouts | Exercises
- Template list → TemplateEditorPage with days and exercise lists per day

Types
```ts
export interface ExerciseTemplate { id: string; exerciseId: string; setCount: number; reps: number; weight?: number; position: number; supersetId?: string; }
```


