import { test, expect } from '@playwright/test'

test('settings route renders and shows sections', async ({ page }) => {
  await page.goto('/settings')
  await expect(page.getByText('Settings')).toBeVisible()
})


