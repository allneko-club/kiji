import { afterEach, beforeEach, vi } from 'vitest';

vi.mock('zustand');

// mock react cache
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const testCache = <T extends Function>(func: T) => func;

vi.mock('react', async () => {
  const react = await vi.importActual<typeof import('react')>('react');

  return {
    ...react,
    cache: testCache,
  };
});

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn(),
      refresh: vi.fn(),
    }),
    notFound: vi.fn(),
    redirect: vi.fn(),
    useSearchParams: vi.fn(),
    usePathname: vi.fn(),
  };
});

vi.mock('server-only', () => {
  return {};
});

vi.mock('@prisma/client', async () => {
  const actual = await vi.importActual('@prisma/client');

  return {
    ...actual,
    Prisma: actual.Prisma,
    PrismaClient: class {
      $connect() {
        return Promise.resolve();
      }
      $disconnect() {
        return Promise.resolve();
      }
      $extends() {
        return this;
      }
    },
  };
});

beforeEach(() => {
  vi.resetModules();
  vi.resetAllMocks();
});

afterEach(() => {
  vi.clearAllMocks();
});
