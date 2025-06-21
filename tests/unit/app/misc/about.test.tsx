import Page from '@/app/(misc)/about/page';
import { renderApp, screen } from '@/tests/test-utils';
import { expect, test } from 'vitest';

test('Page', async () => {
  await renderApp(<Page />);
  expect(screen.getByRole('heading', { level: 1, name: 'このサイトについて' })).toBeDefined();
});
