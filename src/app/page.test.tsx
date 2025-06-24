import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import Page from './page';

describe('Page', () => {
  afterEach(() => {
    cleanup();
  });

  test('Page', async () => {
    render(await Page());
    expect(screen.getByRole('heading', { level: 1, name: 'Blog' })).toBeDefined();
  });
});
