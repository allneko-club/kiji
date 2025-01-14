import { HttpResponse, http, HttpResponseResolver } from 'msw';
import { db, persistDb } from '@/tests/mocks/db';
import { networkDelay, hash, sanitizeUser } from '@/tests/mocks/utils';
import { env } from '@/tests/mocks/env';
import { IdParams, BaseListRequestBody } from '@/tests/mocks/types';
import { UserRole } from '@/config/consts';
import { getServerErrorResponse } from '@/tests/mocks/handlers/index';

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
      console.log(error)
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
      console.log(error)
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
      console.log(error)
      return getServerErrorResponse();
    }
  }),
];
