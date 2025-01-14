import { HttpResponse, http, HttpResponseResolver } from 'msw';
import { UserRole } from '@/config/consts';
import { db, persistDb } from '@/__mocks__/db';
import { networkDelay, hash, sanitizeUser } from '@/__mocks__/utils';
import { env } from '@/__mocks__/env';
import { IdParams, BaseListRequestBody } from '@/__mocks__/types';
import { getServerErrorResponse } from '@/__mocks__/handlers';

type RegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};


function handleGetUsersRequest(resolver: HttpResponseResolver<never, BaseListRequestBody, any>) {
  return http.get(`${env.API_URL}/users`, resolver)
}

function handleGetUserRequest(resolver: HttpResponseResolver<IdParams, any, any>) {
  return http.get(`${env.API_URL}/users/:id`, resolver)
}

function handleCreateUserRequest(resolver: HttpResponseResolver<never, RegisterBody, any>) {
  return http.post(`${env.API_URL}/users`, resolver)
}


export const usersHandlers = [
  handleGetUsersRequest(async () => {
    await networkDelay();
    try {
      const result = db.user.findMany({}).map(sanitizeUser);
      return HttpResponse.json({ users: result, total: result.length });

    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error(error);
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

      const role = UserRole.USER;
      db.user.create({
        ...userObject,
        role,
        password: hash(userObject.password),
      });

      await persistDb('user');

      return HttpResponse.json({ ...userObject, role });
    } catch (error) {
      console.error(error);
      return getServerErrorResponse();
    }
  }),
];
