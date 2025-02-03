import { test, expect } from '@playwright/test';

test('profile', async ({ page }) => {
  await page.goto('/my');
  await expect(page.getByText('My bio')).toBeVisible();
});
