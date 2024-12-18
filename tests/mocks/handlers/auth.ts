import { HttpResponse, http, HttpResponseResolver } from 'msw';
import { env } from '../env';
import { db, persistDb } from '../db';
import {
  authenticate,
  hash,
  requireAuth,
  networkDelay,
} from '../utils';

type RegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type LoginBody = {
  email: string;
  password: string;
};

type ResetPasswordBody = {
  email: string;
};

function handleRegisterRequest(resolver: HttpResponseResolver<never, RegisterBody, any>) {
  return http.post(`${env.API_URL}/auth/register`, resolver)
}

function handleLoginRequest(resolver: HttpResponseResolver<never, LoginBody, any>) {
  return http.post(`${env.API_URL}/auth/login`, resolver)
}

function handleMeRequest(resolver: HttpResponseResolver<never, any, any>) {
  return http.get(`${env.API_URL}/auth/me`, resolver)
}

function handleResetPasswordRequest(resolver: HttpResponseResolver<never, ResetPasswordBody, any>) {
  return http.post(`${env.API_URL}/auth/reset-password`, resolver)
}

export const authHandlers = [
  handleRegisterRequest(async ({ request }) => {
    await networkDelay();
    try {
      const userObject = await request.json();

      const existingUser = db.user.findFirst({
        where: {
          email: {
            equals: userObject.email,
          },
        },
      });

      if (existingUser) {
        return HttpResponse.json(
          { message: 'The email is already in use.' },
          { status: 400 },
        );
      }

      const role = 'ADMIN';
      db.user.create({
        ...userObject,
        role,
        password: hash(userObject.password),
      });

      await persistDb('user');

      return HttpResponse.json({ ...userObject, role });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  handleLoginRequest(async ({ request }) => {
    await networkDelay();

    try {
      const credentials = await request.json();
      return HttpResponse.json(authenticate(credentials));

    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  handleMeRequest(async ({ cookies }) => {
    await networkDelay();

    try {
      const { user } = await requireAuth(cookies);
      return HttpResponse.json(user);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  handleResetPasswordRequest(async () => {
    await networkDelay();

    try {
      return HttpResponse.json({});

    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),
];
