import { env } from './env';

export const enableMocking = async () => {
  if (env.ENABLE_API_MOCKING) {
    const { worker } = await import('./browser');
    const { initializeDb } = await import('./db');
    await initializeDb();
    return worker.start();
  }
};

export { getNotFoundResponse } from '@/tests/mocks/handlers';