import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import GlobalError from './global-error';

describe('GlobalError', () => {
  afterEach(() => {
    cleanup();
  });

  const dummyError = new Error('Test error');
  const resetMock = vi.fn();

  test('レンダリングテスト', () => {
    render(<GlobalError error={dummyError} reset={resetMock} />);

    expect(screen.getByRole('heading', { name: 'エラーが発生しました :(' })).toBeDefined();
  });

  test('開発時は console.error が表示される', async () => {
    (process.env as { [key: string]: string }).NODE_ENV = 'development';
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<GlobalError error={dummyError} reset={resetMock} />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Test error');
    });
  });

  test('Try againボタンをクリックした時のreset()テスト', async () => {
    render(<GlobalError error={{ ...dummyError }} reset={resetMock} />);

    const tryAgainBtn = screen.getByRole('button', { name: 'Try again' });
    userEvent.click(tryAgainBtn);
    await waitFor(() => expect(resetMock).toHaveBeenCalled());
  });
});
