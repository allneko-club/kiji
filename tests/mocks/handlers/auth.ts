import Cookies from 'js-cookie';
import { HttpResponse, http, HttpResponseResolver } from 'msw';
import { env } from '../env';
import { db, persistDb } from '../db';
import {
  authenticate,
  hash,
  requireAuth,
  AUTH_COOKIE,
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

function handleRegisterRequest(resolver: HttpResponseResolver<never, RegisterBody, any>) {
  return http.post(`${env.API_URL}/auth/register`, resolver)
}

function handleLoginRequest(resolver: HttpResponseResolver<never, LoginBody, any>) {
  return http.post(`${env.API_URL}/auth/login`, resolver)
}
function handleMeRequest(resolver: HttpResponseResolver<never, any, any>) {
  return http.get(`${env.API_URL}/auth/me`, resolver)
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

      return HttpResponse.json({});
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
      const result = authenticate(credentials);

      return HttpResponse.json(result, {
        headers: {
          // with a real API servier, the token cookie should also be Secure and HttpOnly
          'Set-Cookie': `${AUTH_COOKIE}=${result.jwt}; Path=/;`,
        },
      });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.post(`${env.API_URL}/auth/logout`, async () => {
    await networkDelay();

    // todo: remove once tests in Github Actions are fixed
    Cookies.remove(AUTH_COOKIE);

    return HttpResponse.json(
      { message: 'Logged out' },
      {
        headers: {
          'Set-Cookie': `${AUTH_COOKIE}=; Path=/;`,
        },
      },
    );
  }),

  handleMeRequest(async ({ cookies }) => {
    await networkDelay();

    try {
      const { user } = requireAuth(cookies);
      return HttpResponse.json({ data: user });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),
];
