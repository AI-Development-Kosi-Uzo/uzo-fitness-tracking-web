import { test, expect } from '@playwright/test'

test('app renders and redirects to /log', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/log$/)
  await expect(page.getByText('Log')).toBeVisible()
})


