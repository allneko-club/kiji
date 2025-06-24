import { expect, test } from '@playwright/test';

test('Credentialsによるログインとログアウトのテスト', async ({ page }) => {
  await test.step('should login', async () => {
    await page.goto('http://localhost:3000/auth/login');
    await page.getByLabel('メールアドレス').fill('admin@example.com');
    await page.getByLabel('パスワード').fill('password');
    await page.locator('main').getByRole('button', { name: 'ログイン', exact: true }).click();
    await page.waitForURL('http://localhost:3000');
    const cookies = await page.context().cookies();

    expect(cookies.length).toEqual(3);
    expect(cookies[0].name).toEqual('authjs.csrf-token');
    expect(cookies[1].name).toEqual('authjs.callback-url');
    expect(cookies[2].name).toEqual('authjs.session-token');
  });

  await test.step('should logout', async () => {
    await page.getByTestId('user-nav').click();
    await page.getByText('ログアウト').click();
    await expect(page.locator('header').getByRole('button', { name: 'ログイン' })).toBeVisible();
  });
});
