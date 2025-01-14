import { HttpResponse, http, HttpResponseResolver } from 'msw';
import { db, persistDb } from '@/tests/mocks/db';
import { networkDelay, sanitizeUser } from '@/tests/mocks/utils';
import { env } from '@/tests/mocks/env';
import {
  IdParams,
  BaseListRequestBody,
  DeleteResponseBody,
  ErrorResponseBody,
  BaseListResponseBody,
} from '@/tests/mocks/types';
import { POSTS_LIMIT, UserRole } from '@/config/consts';
import { getNotFoundResponse } from '@/tests/mocks';
import { getServerErrorResponse } from '@/tests/mocks/handlers';

export type UpdateUserRequestBody = {
  id: string;
  name?: string;
  email?: string;
  role?: UserRole;
  password?: string;
  image?: string;
};

export interface GetUsersResponseBody extends BaseListResponseBody {
  // todo User[] だと型エラーになる原因調査
  users: any,
}

function handleGetUsersRequest(resolver: HttpResponseResolver<never, BaseListRequestBody, GetUsersResponseBody | ErrorResponseBody>) {
  return http.get(`${env.API_URL}/admin/users`, resolver)
}

function handleGetUserRequest(resolver: HttpResponseResolver<IdParams, never, any>) {
  return http.get(`${env.API_URL}/admin/users/:id`, resolver)
}

function handleUpdateUserRequest(resolver: HttpResponseResolver<IdParams, UpdateUserRequestBody, any>) {
  return http.patch(`${env.API_URL}/admin/users/:id`, resolver)
}

function handleDeleteUserRequest(resolver: HttpResponseResolver<IdParams, never, DeleteResponseBody | ErrorResponseBody>) {
  return http.delete(`${env.API_URL}/admin/users/:id`, resolver)
}


export const adminUsersHandlers = [
  handleGetUsersRequest(async ({ request }) => {
    await networkDelay();
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || 1);

    try {
      const users = db.user.findMany({}).map(sanitizeUser);
      const total = users.length;
      const totalPages = Math.ceil(total / POSTS_LIMIT);

      return HttpResponse.json({
        users,
        page,
        total,
        totalPages,
      });

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

  handleUpdateUserRequest(async ({ request }) => {
    await networkDelay();
    try {
      // todo UpdateUserRequestBody修正
      const data = (await request.json()) as UpdateUserRequestBody;
      const user = db.user.update({
        where: {
          id: {
            equals: data.id,
          },
        },
        data,
      });

      if (!user) {
        return getNotFoundResponse('User not found.');
      }

      await persistDb('user');
      return HttpResponse.json(user);
    } catch (error) {
      console.log(error)
      return getServerErrorResponse();
    }
  }),
  
  handleDeleteUserRequest(async ({ params }) => {
    await networkDelay();

    try {
      db.user.delete({
        where: {
          id: {
            equals: params.id,
          },
        },
      });
      await persistDb('user');
      return HttpResponse.json({message: 'Success'});
    } catch (error) {
      console.log(error)
      return getServerErrorResponse();
    }
  }),
];
