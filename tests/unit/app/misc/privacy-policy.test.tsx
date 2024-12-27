import { expect, test } from 'vitest'
import { renderApp, screen } from '@/tests/test-utils';
import Page from '@/app/(misc)/privacy-policy/page'

test('Page', async () => {
  await renderApp(<Page />)
  expect(screen.getByRole('heading', { level: 1, name: 'プライバシーポリシー' })).toBeDefined()
})