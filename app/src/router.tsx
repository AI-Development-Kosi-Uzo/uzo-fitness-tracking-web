import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router'
import LibraryIndexRoute from './routes/library/index'
import LibraryTemplateRoute from './routes/library/template.$id'
import LibraryExercisesRoute from './routes/library/exercises'

// Root layout shell
export function RootLayout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

// Pages (lightweight stubs)
export const LogPage = () => <div>Log</div>
export const LogSessionPage = () => <div>Log Session</div>
export const LibraryPage = () => <Outlet />
export const LibraryTemplatePage = () => <LibraryTemplateRoute />
export const LibraryExercisesPage = () => <LibraryExercisesRoute />
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
const libraryIndexRoute = createRoute({
  getParentRoute: () => libraryRoute,
  path: '/',
  component: LibraryIndexRoute,
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
  libraryRoute.addChildren([libraryIndexRoute, libraryTemplateRoute, libraryExercisesRoute]),
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


