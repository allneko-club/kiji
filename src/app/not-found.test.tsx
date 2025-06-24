import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import NotFound from './not-found';

describe('NotFound', () => {
  afterEach(() => {
    cleanup();
  });

  test('レンダリングテスト', () => {
    render(<NotFound />);

    expect(screen.getByRole('heading', { name: '404 - Not Found' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'ホームに戻る' })).toBeDefined();
  });
});
