import { createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router'
import { RootLayout } from './routes/root'
import { LogPage } from './routes/log'
import { LogSessionPage } from './routes/log/session'
import { LibraryPage } from './routes/library'
import { LibraryTemplatePage } from './routes/library/template.$id'
import { LibraryExercisesPage } from './routes/library/exercises'
import { HistoryPage } from './routes/history'
import { ProgressLayout } from './routes/progress/stats'
import { ProgressStatsPage } from './routes/progress/stats'
import { ProgressPhotosPage } from './routes/progress/photos'
import { SettingsPage } from './routes/settings'

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

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}