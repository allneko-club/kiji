import { HttpResponse, http, HttpResponseResolver } from 'msw';
import { db, persistDb } from '../db';
import {
  requireAuth,
  requireAdmin,
  sanitizeUser,
  networkDelay, getServerErrorResponse, hash,
} from '../utils';
import { env } from '../env';
import { IdParams, ListParams } from '@tests/mocks/types';
import { UserRole } from '@/config/consts';

export type ProfileBody = {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
};

type RegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};


function handleGetUsersRequest(resolver: HttpResponseResolver<never, ListParams, any>) {
  return http.get(`${env.API_URL}/users`, resolver)
}

function handleGetUserRequest(resolver: HttpResponseResolver<IdParams, any, any>) {
  return http.get(`${env.API_URL}/users/:id`, resolver)
}

function handleCreateUserRequest(resolver: HttpResponseResolver<never, RegisterBody, any>) {
  return http.post(`${env.API_URL}/users`, resolver)
}

function handleUpdateUserRequest(resolver: HttpResponseResolver<IdParams, ProfileBody, any>) {
  return http.patch(`${env.API_URL}/users/:id`, resolver)
}

function handleDeleteUserRequest(resolver: HttpResponseResolver<IdParams, any, any>) {
  return http.delete(`${env.API_URL}/users/:id`, resolver)
}


export const usersHandlers = [
  handleGetUsersRequest(async ({ cookies }) => {
    await networkDelay();
    try {
      const result = db.user.findMany({}).map(sanitizeUser);
      return HttpResponse.json({ users: result, total: result.length });

    } catch (error: any) {
      return getServerErrorResponse();
    }
  }),

  handleCreateUserRequest(async ({ request }) => {
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

      const role = UserRole.ADMIN;
      db.user.create({
        ...userObject,
        role,
        password: hash(userObject.password),
      });

      await persistDb('user');

      return HttpResponse.json({ ...userObject, role });
    } catch (error: any) {
      return getServerErrorResponse();
    }
  }),

  handleGetUserRequest(async ({ params }) => {
    await networkDelay();
    try {
      const id = params.id as string;
      const result = db.user.findFirst({
        where: {
          id: {
            equals: id,
          },
        },
      });

      return HttpResponse.json(result);
    } catch (error: any) {
      return getServerErrorResponse();
    }
  }),

  handleUpdateUserRequest(async ({ request, cookies }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      requireAdmin(user);

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
  
  handleDeleteUserRequest(async ({ cookies, params }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      requireAdmin(user);

      const result = db.user.delete({
        where: {
          id: {
            equals: params.id,
          },
        },
      });
      await persistDb('user');
      return HttpResponse.json(result);
    } catch (error: any) {
      return getServerErrorResponse();
    }
  }),
];
