export const paths = {
  root: '/',
  log: '/log',
  logSession: '/log/session',
  library: '/library',
  libraryTemplate: (templateId: string) => `/library/templates/${templateId}`,
  libraryExercises: '/library/exercises',
  history: '/history',
  progress: '/progress',
  progressStats: '/progress/stats',
  progressPhotos: '/progress/photos',
  settings: '/settings',
} as const


