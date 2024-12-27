import { HttpResponse, http, HttpResponseResolver } from 'msw';

import { env } from '@/config/env';

import { db, persistDb } from '../db';
import {
  requireAuth,
  requireAdmin,
  networkDelay, getServerErrorResponse, sanitizeUser,
} from '../utils';
import { IdParams, ListParams } from '@/tests/mocks/types';

type PostBody = {
  title: string;
  body: string;
  public: boolean;
};

interface getPostsBodyType extends ListParams{
  isPublic: boolean,
}

function handleGetPostsRequest(resolver: HttpResponseResolver<never, getPostsBodyType, any>) {
  return http.get(`${env.API_URL}/posts`, resolver)
}

function handleGetPostRequest(resolver: HttpResponseResolver<IdParams, {isPublic: boolean}, any>) {
  return http.get(`${env.API_URL}/posts/:id`, resolver)
}

function handleCreatePostRequest(resolver: HttpResponseResolver<never, any, any>) {
  return http.post(`${env.API_URL}/posts`, resolver)
}

function handleUpdatePostRequest(resolver: HttpResponseResolver<IdParams, any, any>) {
  return http.patch(`${env.API_URL}/posts/:id`, resolver)
}

function handleDeletePostRequest(resolver: HttpResponseResolver<IdParams, any, any>) {
  return http.delete(`${env.API_URL}/posts/:id`, resolver)
}


export const postsHandlers = [
  handleGetPostsRequest(async ({ cookies, request }) => {
    await networkDelay();
    try {
      const { user, error } = await requireAuth(cookies);
      if (!user) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }

      const url = new URL(request.url);
      const page = Number(url.searchParams.get('page') || 1);
      const isMyPosts = url.searchParams.get('myPosts') === "true";
      const isPublic = url.searchParams.get('isPublic');
      let where = {};
      if(isMyPosts){
        where = {
          authorId: {
            equals: user.id,
          },
        };
      }
      if(isPublic === "true"){
        where = {
          public: {
            equals: true,
          },
        };
      }
      // if(user.role !== UserRole.ADMIN){
      //   where = {
      //     public: {
      //       equals: true,
      //     },
      //   };
      // }

      const total = db.post.count({ where });

      const totalPages = Math.ceil(total / 10);
      const result = db.post
        .findMany({
          where,
          take: 10,
          skip: 10 * (page - 1),
        })
        .map(({ authorId, ...post }) => {
          const author = db.user.findFirst({
            where: {
              id: {
                equals: authorId,
              },
            },
          });
          return {
            ...post,
            author: author ? sanitizeUser(author) : {},
          };
        });
      return HttpResponse.json({
        posts: result,
        page,
        total,
        totalPages,
      });
    } catch (error: any) {
      console.log(error)
      return getServerErrorResponse(error.message);
    }
  }),

  handleGetPostRequest(async ({ request, params, cookies }) => {
    await networkDelay();
    const url = new URL(request.url);
    const isPublic = url.searchParams.get('isPublic');
    const id = params.id as string;
    let post = null;

    if(isPublic === "true" || isPublic === "false"){
      post = db.post.findFirst({
        where: {
          id: {
            equals: id,
          },
          public: {
            equals: isPublic === "true",
          },
        },
      });
    }else {
      post = db.post.findFirst({
        where: {
          id: {
            equals: id,
          },
        },
      });
    }

    if (post?.public) {
      const author = db.user.findFirst({
        where: {
          id: {
            equals: post.authorId,
          },
        },
      });

      const result = {
        ...post,
        author: author ? sanitizeUser(author) : {},
      };

      return HttpResponse.json(result);
    }

    try {
      const { user, error } = await requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      const post = db.post.findFirst({
        where: {
          id: {
            equals: id,
          },
        },
      });

      if (!post) {
        return HttpResponse.json(
          { message: 'Post not found' },
          { status: 404 },
        );
      }

      const author = db.user.findFirst({
        where: {
          id: {
            equals: post.authorId,
          },
        },
      });

      const result = {
        ...post,
        author: author ? sanitizeUser(author) : {},
      };

      return HttpResponse.json(result);
    } catch (error: any) {
      return getServerErrorResponse(error.message);
    }
  }),

  handleCreatePostRequest(async ({ request, cookies }) => {
    await networkDelay();
    try {
      const { user, error } = await requireAuth(cookies);
      if (!user) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }

      requireAdmin(user);
      const data = (await request.json()) as PostBody;
      const result = db.post.create({
        authorId: user?.id,
        ...data,
      });
      await persistDb('post');
      return HttpResponse.json(result);
    } catch (error: any) {
      return getServerErrorResponse(error.message);
    }
  }),

  handleUpdatePostRequest(async ({ request, params, cookies }) => {
      await networkDelay();
      try {
        const { user, error } = await requireAuth(cookies);
        if (error) {
          return HttpResponse.json({ message: error }, { status: 401 });
        }
        const data = (await request.json()) as PostBody;
        const id = params.id as string;
        requireAdmin(user);
        const result = db.post.update({
          where: {
            id: {
              equals: id,
            },
          },
          data,
        });
        await persistDb('post');
        return HttpResponse.json(result);
      } catch (error: any) {
        return getServerErrorResponse(error.message);
      }
    },
  ),

  handleDeletePostRequest(async ({ cookies, params }) => {
      await networkDelay();
      try {
        const { user, error } = await requireAuth(cookies);
        if (error) {
          return HttpResponse.json({ message: error }, { status: 401 });
        }
        const id = params.id as string;
        requireAdmin(user);
        const result = db.post.delete({
          where: {
            id: {
              equals: id,
            },
          },
        });
        await persistDb('post');
        return HttpResponse.json(result);
      } catch (error: any) {
        return getServerErrorResponse(error.message);
      }
    },
  ),
];