import { test, expect } from '@playwright/test';

test('dashboard', async ({ page }) => {
  await page.goto('/admin');
  await expect(page.getByText('ダッシュボード')).toBeVisible();
});
