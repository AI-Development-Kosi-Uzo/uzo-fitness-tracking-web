import { test, expect } from '@playwright/test'

test('progress routes mount', async ({ page }) => {
  await page.goto('/progress/stats')
  await expect(page.getByText('Progress - Stats')).toBeVisible()

  await page.goto('/progress/photos')
  await expect(page.getByText('Progress - Photos')).toBeVisible()
})


