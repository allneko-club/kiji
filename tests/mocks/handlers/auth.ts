import { HttpResponse, http, HttpResponseResolver } from 'msw';
import { env } from '../env';
import { db, persistDb } from '../db';
import {
  hash,
  requireAuth,
  networkDelay, sanitizeUser, getServerErrorResponse,
} from '../utils';
import { ProfileBody } from '@tests/mocks/handlers/users';

type LoginBody = {
  email: string;
  password: string;
};

type ResetPasswordBody = {
  email: string;
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
      return getServerErrorResponse();
    }
  }),

  handleMeRequest(async ({ cookies }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      return HttpResponse.json(user);
    } catch (error: any) {
      return getServerErrorResponse();
    }
  }),

  handleUpdateProfileRequest(async ({ request, cookies }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies);
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
      return getServerErrorResponse();
    }
  }),

  handleResetPasswordRequest(async () => {
    await networkDelay();

    try {
      return HttpResponse.json({});

    } catch (error: any) {
      return getServerErrorResponse();
    }
  }),
];
