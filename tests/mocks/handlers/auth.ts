import { HttpResponse, http, HttpResponseResolver } from 'msw';
import { env } from '@/tests/mocks/env';
import { db, persistDb } from '@/tests/mocks/db';
import { hash, requireAuth, networkDelay, sanitizeUser, getServerErrorResponse } from '@/tests/mocks/utils';

type LoginBody = {
  email: string;
  password: string;
};

type ResetPasswordBody = {
  email: string;
};

export type ProfileBody = {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
};

function handleLoginRequest(resolver: HttpResponseResolver<never, LoginBody, any>) {
  return http.post(`${env.API_URL}/auth/login`, resolver)
}

function handleMeRequest(resolver: HttpResponseResolver<never, any, any>) {
  return http.get(`${env.API_URL}/auth/me`, resolver)
}

function handleUpdateProfileRequest(resolver: HttpResponseResolver<never, ProfileBody, any>) {
  return http.patch(`${env.API_URL}/auth/me`, resolver)
}

function handleResetPasswordRequest(resolver: HttpResponseResolver<never, ResetPasswordBody, any>) {
  return http.post(`${env.API_URL}/auth/reset-password`, resolver)
}

export const authHandlers = [
  handleLoginRequest(async ({ request }) => {
    await networkDelay();
    try {
      const credentials = await request.json();
      const user = db.user.findFirst({
        where: {
          email: {
            equals: credentials.email,
          },
        },
      });

      if (user?.password === hash(credentials.password)) {
        return HttpResponse.json(sanitizeUser(user));
      }else{
        return HttpResponse.json();
      }

    } catch (error: any) {
      return getServerErrorResponse(error.message);
    }
  }),

  handleMeRequest(async ({ cookies }) => {
    await networkDelay();

    try {
      const { user, error } = await requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      return HttpResponse.json(user);
    } catch (error: any) {
      return getServerErrorResponse(error.message);
    }
  }),

  handleUpdateProfileRequest(async ({ request, cookies }) => {
    await networkDelay();

    try {
      const { user, error } = await requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      const data = (await request.json()) as ProfileBody;
      const result = db.user.update({
        where: {
          id: {
            equals: user?.id,
          },
        },
        data,
      });
      await persistDb('user');
      return HttpResponse.json(result);
    } catch (error: any) {
      return getServerErrorResponse(error.message);
    }
  }),

  handleResetPasswordRequest(async () => {
    await networkDelay();

    try {
      return HttpResponse.json({});

    } catch (error: any) {
      return getServerErrorResponse(error.message);
    }
  }),
];
