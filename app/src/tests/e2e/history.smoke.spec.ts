import { test, expect } from '@playwright/test'

test('history route mounts and filters by date', async ({ page }) => {
  await page.goto('/history')
  await expect(page.getByText('History')).toBeVisible()

  await expect(page.getByRole('heading', { name: /sessions on/i })).toBeVisible()

  const today = new Date().toISOString().slice(0, 10)
  await page.getByRole('button', { name: `Select ${today}` }).click()
  await expect(page.getByText('Push Day')).toBeVisible()
})


