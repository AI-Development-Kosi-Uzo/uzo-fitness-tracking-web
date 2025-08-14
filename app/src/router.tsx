import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
  Link,
} from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { paths } from './routes/paths'
import { completedSetsRepo, sessionExercisesRepo, workoutPlansRepo, workoutSessionsRepo, exercisesRepo, workoutTemplatesRepo } from './data/repositories/instances'
import type { Weekday } from './data/types'
import type { CompletedSet, SessionExercise } from './data/types'

// Root layout shell
export function RootLayout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

// Pages (lightweight stubs)
export const LogPage = () => {
  const [loading, setLoading] = useState(true)
  const [todaySessionId, setTodaySessionId] = useState<string | null>(null)
  const [planName, setPlanName] = useState<string>('')

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const active = await workoutPlansRepo.getActive()
      const today = await workoutSessionsRepo.getToday()
      if (!mounted) return
      setPlanName(active?.customName ?? 'No active plan')
      setTodaySessionId(today?.id ?? null)
      setLoading(false)
    })()
    return () => { mounted = false }
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2>Logging</h2>
      <p>Plan: {planName}</p>
      {todaySessionId ? (
        <Link to={paths.logSession} search={{ sessionId: todaySessionId }}>Resume today&apos;s session</Link>
      ) : (
        <StartSessionButton />)
      }
    </div>
  )
}

function StartSessionButton() {
  const [starting, setStarting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const onStart = async () => {
    setStarting(true)
    setError(null)
    try {
      const active = await workoutPlansRepo.getActive()
      const todayIso = new Date().toISOString().slice(0, 10)
      const session = await workoutSessionsRepo.create({
        date: todayIso,
        title: 'Workout',
        duration: null,
        createdAt: new Date().toISOString(),
        planId: active?.id ?? 'wp-temp',
      })
      // Seed session exercises from active plan's template and today's day
      const weekdayIndex = new Date().getDay() // 0-6 => Sunday-Saturday
      const weekdayMap: Weekday[] = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
      const weekday = weekdayMap[weekdayIndex]
      if (active?.templateId) {
        const days = await workoutTemplatesRepo.listDays(active.templateId)
        const todayDay = days.find((d) => d.weekday === weekday)
        if (todayDay) {
          const exTemplates = await workoutTemplatesRepo.listExercisesByDay(todayDay.id)
          let position = 0
          for (const et of exTemplates) {
            await sessionExercisesRepo.create({
              sessionId: session.id,
              exerciseId: et.exerciseId,
              plannedSets: et.setCount,
              plannedReps: et.reps,
              plannedWeight: et.weight,
              position: position++,
              supersetId: et.supersetId,
              previousTotalVolume: null,
              previousSessionDate: null,
              currentSet: 1,
              isCompleted: false,
              restTimer: null,
              createdAt: new Date().toISOString(),
            })
          }
        }
      }
      window.location.href = paths.logSession + `?sessionId=${encodeURIComponent(session.id)}`
    } catch (e) {
      setError((e as Error).message)
      setStarting(false)
    }
  }
  return (
    <div>
      <button onClick={onStart} disabled={starting}>{starting ? 'Starting…' : 'Start new session'}</button>
      {error && <p role="alert">{error}</p>}
    </div>
  )
}

export const LogSessionPage = () => {
  const search = (router as any).state.location.search as { sessionId?: string }
  const sessionId = search?.sessionId ?? null
  const [loading, setLoading] = useState(true)
  const [exercises, setExercises] = useState<SessionExercise[]>([])
  const [setsByExercise, setSetsByExercise] = useState<Record<string, CompletedSet[]>>({})
  const [namesByExerciseId, setNamesByExerciseId] = useState<Record<string, string>>({})
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        if (!sessionId) throw new Error('Missing sessionId')
        const list = await sessionExercisesRepo.listBySessionId(sessionId)
        const names: Record<string, string> = {}
        for (const se of list) {
          const ex = await exercisesRepo.getById(se.exerciseId)
          if (ex) names[se.exerciseId] = ex.name
        }
        const setsEntries = await Promise.all(
          list.map(async (se) => [se.id, await sessionExercisesRepo.listCompletedSets(se.id)] as const)
        )
        if (!mounted) return
        setExercises(list)
        setNamesByExerciseId(names)
        setSetsByExercise(Object.fromEntries(setsEntries))
        setLoading(false)
      } catch (e) {
        if (!mounted) return
        setError((e as Error).message)
        setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [sessionId])

  const allCompleted = useMemo(() => {
    return exercises.length > 0 && exercises.every((se) => se.isCompleted)
  }, [exercises])

  const finish = async () => {
    if (!allCompleted) {
      alert('Complete all exercises before finishing.')
      return
    }
    if (!sessionId) return
    await workoutSessionsRepo.update(sessionId, { duration: 0 })
    window.location.href = paths.log
  }

  if (loading) return <div>Loading session…</div>
  if (error) return <div role="alert">{error}</div>

  return (
    <div>
      <h2>Log Session</h2>
      {exercises.map((se) => (
        <ExerciseCard
          key={se.id}
          se={se}
          name={namesByExerciseId[se.exerciseId] ?? se.exerciseId}
          sets={setsByExercise[se.id] ?? []}
          onUpdate={async (updates) => {
            const updated = await sessionExercisesRepo.update(se.id, updates)
            setExercises((prev) => prev.map((p) => (p.id === se.id ? updated : p)))
          }}
          onAddSet={async () => {
            const sets = setsByExercise[se.id] ?? []
            const created = await completedSetsRepo.create({
              sessionExerciseId: se.id,
              reps: se.plannedReps,
              weight: se.plannedWeight ?? 0,
              isCompleted: false,
              position: sets.length,
              externalSampleId: null,
            })
            setSetsByExercise((prev) => ({ ...prev, [se.id]: [...sets, created] }))
          }}
          onToggleSet={async (setId) => {
            const sets = setsByExercise[se.id] ?? []
            const target = sets.find((s) => s.id === setId)
            if (!target) return
            const updated = await completedSetsRepo.update(setId, { isCompleted: !target.isCompleted })
            setSetsByExercise((prev) => ({ ...prev, [se.id]: sets.map((s) => (s.id === setId ? updated : s)) }))
          }}
        />
      ))}
      <button onClick={finish} disabled={!allCompleted}>Finish Session</button>
    </div>
  )
}

function ExerciseCard(props: {
  se: SessionExercise
  name: string
  sets: CompletedSet[]
  onUpdate: (updates: Partial<Omit<SessionExercise, 'id'>>) => Promise<void>
  onAddSet: () => Promise<void>
  onToggleSet: (setId: string) => Promise<void>
}) {
  const { se, name, sets, onUpdate, onAddSet, onToggleSet } = props
  return (
    <div style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}>
      <strong>{name}</strong>
      <div>Planned: {se.plannedSets} x {se.plannedReps}{se.plannedWeight ? ` @ ${se.plannedWeight}` : ''}</div>
      <div>
        <em>Sets</em>
        <ul>
          {sets.map((s) => (
            <li key={s.id}>
              <label>
                <input type="checkbox" checked={s.isCompleted} onChange={() => onToggleSet(s.id)} />
                {s.reps} reps{typeof s.weight === 'number' ? ` @ ${s.weight}` : ''}
              </label>
            </li>
          ))}
        </ul>
        <button onClick={onAddSet}>Add set</button>
      </div>
      <div>
        <button onClick={() => onUpdate({ isCompleted: !se.isCompleted })}>{se.isCompleted ? 'Mark incomplete' : 'Mark complete'}</button>
      </div>
    </div>
  )
}
export const LibraryPage = () => <div>Library</div>
export const LibraryTemplatePage = () => <div>Library Template</div>
export const LibraryExercisesPage = () => <div>Library Exercises</div>
export const HistoryPage = () => <div>History</div>
export const ProgressLayout = () => <Outlet />
import ProgressStatsPage from './routes/progress/stats'
import ProgressPhotosPage from './routes/progress/photos'
export const SettingsPage = () => <div>Settings</div>

// Route tree
const rootRoute = createRootRoute({ component: RootLayout })

const indexRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/log' })
  },
})

const logRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'log',
  component: LogPage,
})
const logSessionRoute = createRoute({
  getParentRoute: () => logRoute,
  path: 'session',
  component: LogSessionPage,
})

const libraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'library',
  component: LibraryPage,
})
const libraryTemplateRoute = createRoute({
  getParentRoute: () => libraryRoute,
  path: 'templates/$templateId',
  component: LibraryTemplatePage,
})
const libraryExercisesRoute = createRoute({
  getParentRoute: () => libraryRoute,
  path: 'exercises',
  component: LibraryExercisesPage,
})

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'history',
  component: HistoryPage,
})

const progressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'progress',
  component: ProgressLayout,
})
const progressStatsRoute = createRoute({
  getParentRoute: () => progressRoute,
  path: 'stats',
  component: ProgressStatsPage,
})
const progressPhotosRoute = createRoute({
  getParentRoute: () => progressRoute,
  path: 'photos',
  component: ProgressPhotosPage,
})

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'settings',
  component: SettingsPage,
})

const routeTree = rootRoute.addChildren([
  indexRedirectRoute,
  logRoute.addChildren([logSessionRoute]),
  libraryRoute.addChildren([libraryTemplateRoute, libraryExercisesRoute]),
  historyRoute,
  progressRoute.addChildren([progressStatsRoute, progressPhotosRoute]),
  settingsRoute,
])

export const router = createRouter({ routeTree })

export function AppRouter() {
  return <RouterProvider router={router} />
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


