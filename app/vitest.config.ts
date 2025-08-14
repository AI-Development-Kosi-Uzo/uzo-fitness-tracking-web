import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    include: ['src/tests/unit/**/*.spec.ts'],
    exclude: ['tests/**', 'src/tests/e2e/**'],
  },
})


