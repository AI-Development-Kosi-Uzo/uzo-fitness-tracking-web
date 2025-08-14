import { test, expect } from '@playwright/test'

test('history route mounts and filters by date', async ({ page }) => {
  await page.goto('/history')
  await expect(page.getByText('History')).toBeVisible()

  // should show a calendar and a sessions section
  await expect(page.getByRole('heading', { name: /sessions on/i })).toBeVisible()

  // pick today; Memory repo has one session on today with title 'Push Day'
  const today = new Date().toISOString().slice(0, 10)
  await page.getByRole('button', { name: `Select ${today}` }).click()
  await expect(page.getByText('Push Day')).toBeVisible()
})


