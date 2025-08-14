import { test, expect } from '@playwright/test'

test('logging pages render', async ({ page }) => {
	await page.goto('/log')
	await expect(page.getByRole('heading', { name: 'Log' })).toBeVisible()
	await page.goto('/log/session')
	await expect(page.getByRole('heading').first()).toBeVisible()
})