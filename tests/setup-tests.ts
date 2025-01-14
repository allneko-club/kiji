import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest'


import { initializeDb, resetDb } from '@/__mocks__/db';
import { server } from '@/__mocks__/server';

vi.mock('zustand');

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
  vi.mock('next/navigation', async () => {
    const actual = await vi.importActual('next/navigation');
    return {
      ...actual,
      useRouter: () => {
        return {
          push: vi.fn(),
          replace: vi.fn(),
        };
      },
      usePathname: () => '/app',
      useSearchParams: () => ({
        get: vi.fn(),
      }),
    };
  });
});
afterAll(() => server.close());
beforeEach(() => {
  const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  vi.stubGlobal('ResizeObserver', ResizeObserverMock);

  window.btoa = (str: string) => Buffer.from(str, 'binary').toString('base64');
  window.atob = (str: string) => Buffer.from(str, 'base64').toString('binary');

  initializeDb();
});
afterEach(() => {
  server.resetHandlers();
  resetDb();
});
