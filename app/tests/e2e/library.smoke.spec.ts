import { test, expect } from '@playwright/test'

test('library index lists templates and exercises, can open dialog', async ({ page }) => {
  await page.goto('/library')
  await expect(page.getByRole('heading', { name: 'Library' })).toBeVisible()

  // Templates section
  await expect(page.getByRole('heading', { name: 'Templates' })).toBeVisible()
  // Seed contains at least one template
  await expect(page.getByText('Push/Pull/Legs')).toBeVisible()

  // Exercises section
  await expect(page.getByRole('heading', { name: 'Exercises' })).toBeVisible()
  await expect(page.getByText('Bench Press')).toBeVisible()

  // Create dialogs open
  await page.getByRole('button', { name: 'Create Template' }).click()
  await expect(page.getByRole('heading', { name: 'Create Template' })).toBeVisible()
  await page.getByRole('button', { name: 'Cancel' }).click()
})

test('navigate to template detail', async ({ page }) => {
  await page.goto('/library')
  await page.getByRole('link', { name: /Push\/Pull\/Legs/ }).click()
  await expect(page).toHaveURL(/\/library\/templates\//)
  await expect(page.getByText('Push Day')).toBeVisible()
})


