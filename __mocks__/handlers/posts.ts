import { HttpResponse, http, HttpResponseResolver } from 'msw';
import { env } from '@/config/env';
import { POSTS_LIMIT } from '@/config/consts';
import { User } from '@/types/api/users';
import { Post } from '@/types/api/posts';
import { networkDelay, sanitizeUser } from '@/__mocks__/utils';
import {
  BaseListResponseBody,
  ErrorResponseBody,
  IdParams,
  BaseListRequestBody,
  DeleteResponseBody,
} from '@/types/api';
import { requireAuth } from '@/__mocks__/handlers/utils';
import { getNotFoundResponse } from '@/__mocks__/handlers';
import { db, persistDb } from '@/__mocks__/db';

type CreatePostRequestBody = {
  title: string;
  body: string;
  public: boolean;
};

type UpdatePostRequestBody = CreatePostRequestBody;

interface GetPostsRequestBody extends BaseListRequestBody{
  isPublic: boolean,
}

export interface GetPostsResponseBody extends BaseListResponseBody {
  posts: Post[],
}

function handleGetPostsRequest(resolver: HttpResponseResolver<never, GetPostsRequestBody, GetPostsResponseBody | ErrorResponseBody>) {
  return http.get(`${env.API_URL}/posts`, resolver)
}

function handleGetPostRequest(resolver: HttpResponseResolver<IdParams, any, Post | ErrorResponseBody>) {
  return http.get(`${env.API_URL}/posts/:id`, resolver)
}

function handleCreatePostRequest(resolver: HttpResponseResolver<never, CreatePostRequestBody, Post | ErrorResponseBody>) {
  return http.post(`${env.API_URL}/posts`, resolver)
}

function handleUpdatePostRequest(resolver: HttpResponseResolver<IdParams, UpdatePostRequestBody, Post | ErrorResponseBody>) {
  return http.patch(`${env.API_URL}/posts/:id`, resolver)
}

function handleDeletePostRequest(resolver: HttpResponseResolver<IdParams, never, DeleteResponseBody | ErrorResponseBody>) {
  return http.delete(`${env.API_URL}/posts/:id`, resolver)
}


export const postsHandlers = [
  handleGetPostsRequest(async ({ cookies, request }) => {
    await networkDelay();
    const { user, error } = await requireAuth(cookies);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || 1);
    const isMyPosts = url.searchParams.get('myPosts') === "true";

    if(isMyPosts){
      if (!user) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
    }
    const posts = db.post
      .findMany({ take: POSTS_LIMIT, skip: POSTS_LIMIT * (page - 1) })
      .map((post) => {
        const author = db.user.findFirst({
          where: {
            id: {
              equals: post.authorId,
            },
          },
        });
        return {
          ...post,
          author: author ? sanitizeUser(author) : undefined,
        };
      });
    const total = posts.length;
    const totalPages = Math.ceil(total / POSTS_LIMIT);

    return HttpResponse.json({
      posts,
      page,
      total,
      totalPages,
    });
  }),

  handleGetPostRequest(async ({ params, cookies }) => {
    await networkDelay();
    const id = params.id as string;
    const post = db.post.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    if (!post) {
      return getNotFoundResponse('Post not found.');
    }

    const author = db.user.findFirst({
      where: {
        id: {
          equals: post.authorId,
        },
      },
    });
    if (post.public) {
      return HttpResponse.json({ ...post, author: author ? sanitizeUser(author) : undefined });

    } else {
      // 非公開の投稿は投稿したユーザーのみ取得可能
      const { user } = await requireAuth(cookies);
      if (!user || post.authorId !== user.id) {
        return getNotFoundResponse('Post not found.');
      }

      return HttpResponse.json({ ...post, author: author ? sanitizeUser<User>(author) : undefined });
    }
  }),

  handleCreatePostRequest(async ({ request, cookies }) => {
    await networkDelay();
    const { user, error } = await requireAuth(cookies);
    if (!user) {
      return HttpResponse.json({ message: error }, { status: 401 });
    }

    const data = await request.json();
    const created = db.post.create(data);
    await persistDb('post');
    return HttpResponse.json(created);
  }),

  /**
   * ログインユーザー && 自分自身の投稿のみ更新可能
   */
  handleUpdatePostRequest(async ({ request, params, cookies }) => {
    await networkDelay();
    const { user, error } = await requireAuth(cookies);
    if (!user) {
      return HttpResponse.json({ message: error }, { status: 401 });
    }
    const data = await request.json();
    const id = params.id as string;
    const updated = db.post.update({
      where: { id: { equals: id } },
      data,
    });
    await persistDb('post');
    return HttpResponse.json(updated);
  }),

  /**
   * ログインユーザー && 自分自身の投稿のみ削除可能
   */
  handleDeletePostRequest(async ({ cookies, params }) => {
    await networkDelay();
    const id = params.id as string;
    const post = db.post.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    if(!post){
      return getNotFoundResponse('Post not found.');
    }

    const { user, error } = await requireAuth(cookies);
    if (!user) {
      return HttpResponse.json({ message: error }, { status: 401 });
    }else if(user.id !== post.authorId){
      return HttpResponse.json({ message: "Can't delete other's post." }, { status: 401 });
    }

    db.post.delete({ where: { id: { equals: id } } });
    await persistDb('post');
    return HttpResponse.json({message: 'Success'});
  }),
];