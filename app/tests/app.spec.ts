import { test, expect } from '@playwright/test';

test('homepage loads and counter increments', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Vite + React' })).toBeVisible();

  const counterButton = page.getByRole('button', { name: /count is/i });
  await expect(counterButton).toContainText('count is 0');

  await counterButton.click();
  await expect(counterButton).toContainText('count is 1');
});


