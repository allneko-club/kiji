import { http, HttpResponse } from 'msw';
import { authHandlers } from './auth';
import { contactHandlers } from './contact';
import { usersHandlers } from './users';
import { postsHandlers } from './posts';
import { networkDelay } from '@/__mocks__/utils';
import { ErrorResponseBody } from '@/types/api';

export const handlers = [
  ...authHandlers,
  ...contactHandlers,
  ...postsHandlers,
  ...usersHandlers,
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/healthcheck`, async () => {
    await networkDelay();
    return HttpResponse.json({ ok: true });
  }),
];

export const getServerErrorResponse = (message = 'Server Error', status = 500) => HttpResponse.json<ErrorResponseBody>(
  { message },
  { status: status },
);

export const getNotFoundResponse = (message = 'not found') => HttpResponse.json<ErrorResponseBody>(
  { message },
  { status: 404 },
);