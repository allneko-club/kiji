import { HttpResponse, http, HttpResponseResolver } from 'msw';


import { db, persistDb } from '../db';
import {
  requireAuth,
  requireAdmin,
  sanitizeUser,
  networkDelay,
} from '../utils';
import { env } from '../env';

type ProfileBody = {
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
};

type EmptyObject = {[key: string]: never}

// todo responseのtype
function handleUsersRequest(resolver: HttpResponseResolver<never, EmptyObject, any>) {
  return http.post(`${env.API_URL}/users`, resolver)
}

// todo responseのtype
function handleProfileRequest(resolver: HttpResponseResolver<never, ProfileBody, any>) {
  return http.get(`${env.API_URL}/users/profile`, resolver)
}

// todo request, responseのtype
function handleDeleteUserRequest(resolver: HttpResponseResolver<never, any, any>) {
  return http.delete(`${env.API_URL}/users/:userId`, resolver)
}

export const usersHandlers = [
  handleUsersRequest(async ({ cookies }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      const result = db.user
        .findMany({
          where: {
            teamId: {
              equals: user?.teamId,
            },
          },
        })
        .map(sanitizeUser);

      return HttpResponse.json({ data: result });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  handleProfileRequest(async ({ request, cookies }) => {
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
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  handleDeleteUserRequest(async ({ cookies, params }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      const userId = params.userId as string;
      requireAdmin(user);
      const result = db.user.delete({
        where: {
          id: {
            equals: userId,
          },
          teamId: {
            equals: user?.teamId,
          },
        },
      });
      await persistDb('user');
      return HttpResponse.json(result);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),
];
