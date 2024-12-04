import { HttpResponse, http } from 'msw';
import { networkDelay } from '../utils';
import { authHandlers } from './auth';
import { usersHandlers } from './users';

export const handlers = [
  ...authHandlers,
  ...usersHandlers,
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/healthcheck`, async () => {
    await networkDelay();
    return HttpResponse.json({ ok: true });
  }),
];
