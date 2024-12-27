import { HttpResponse, http } from 'msw';
import { networkDelay } from '../utils';
import { authHandlers } from './auth';
import { contactHandlers } from './contact';
import { usersHandlers } from './users';
import { postsHandlers } from './posts';
import { adminUsersHandlers } from './admin/users';

export const handlers = [
  ...adminUsersHandlers,
  ...authHandlers,
  ...contactHandlers,
  ...postsHandlers,
  ...usersHandlers,
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/healthcheck`, async () => {
    await networkDelay();
    return HttpResponse.json({ ok: true });
  }),
];
