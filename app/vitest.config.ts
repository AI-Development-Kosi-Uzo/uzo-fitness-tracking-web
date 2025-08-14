import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: [
      'tests/e2e/**',
      'tests/**/e2e/**',
      'tests/app.spec.ts',
      '**/node_modules/**',
      '**/dist/**',
    ],
  },
})


