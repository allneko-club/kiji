import { HttpResponse, http, HttpResponseResolver } from 'msw';
import { env } from '@/config/env';
import { networkDelay, sanitizeUser } from '../utils';
import {
  BaseListResponseBody,
  ErrorResponseBody,
  IdParams,
  BaseListRequestBody,
  DeleteResponseBody,
} from '@/tests/mocks/types';
import { getDummyPosts } from '@/tests/mocks/handlers/dummyPosts';
import { POSTS_LIMIT } from '@/config/consts';
import { getDummyUsers } from '@/tests/mocks/handlers/dummyUsers';
import { Post, User } from '@/types/api';
import { generatePost } from '@/tests/data-generators';
import { getNotFoundResponse } from '@/tests/mocks';
import { requireAuth } from '@/tests/mocks/handlers/utils';

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
    const isPublic = url.searchParams.get('isPublic');

    if(isMyPosts){
      if (!user) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
    }
    const posts = getDummyPosts({LIMIT: POSTS_LIMIT, page, isPublic, isMyPosts});
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
    const post = getDummyPosts({}).find((post) => post.id === id);

    if (!post) {
      return getNotFoundResponse('Post not found.');
    }

    const author = getDummyUsers().find((user) => user.id === post.authorId);
    if (post.public) {
      return HttpResponse.json({ ...post, author: author ? sanitizeUser(author) : undefined });

    } else {
      // 非公開の投稿は投稿したユーザーのみ取得可能
      const { user, error } = await requireAuth(cookies);
      if (!user) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }

      if (post.authorId !== user.id) {
        return getNotFoundResponse('Post not found.');
      }

      return HttpResponse.json({
        ...post,
        author: author ? sanitizeUser<User>(author) : undefined,
      });
    }
  }),

  handleCreatePostRequest(async ({ request, cookies }) => {
    await networkDelay();
    const { user, error } = await requireAuth(cookies);
    if (!user) {
      return HttpResponse.json({ message: error }, { status: 401 });
    }

    const data = await request.json();
    const dummyPost = generatePost()
    return HttpResponse.json({ ...dummyPost, authorId: user.id, ...data });
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

      return HttpResponse.json({ id: id, authorId: user.id, createdAt:1734834215543, ...data });
    },
  ),

  /**
   * ログインユーザー && 自分自身の投稿のみ削除可能
   */
  handleDeletePostRequest(async ({ cookies, params }) => {
      await networkDelay();
      const id = params.id as string;
      const post = getDummyPosts({}).find((post) => post.id === id)

      if(!post){
        return getNotFoundResponse('Post not found.');
      }

      const { user, error } = await requireAuth(cookies);
      if (!user) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }else if(user.id !== post.authorId){
        return HttpResponse.json({ message: "Can't delete other's post." }, { status: 401 });
      }

      return HttpResponse.json({message: 'Success'});
    },
  ),
];