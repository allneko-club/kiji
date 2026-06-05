import { getPosts } from '@/api/post';
import { POST_LIMIT } from '@/lib/consts';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';
  const params = { perPage: POST_LIMIT, page, query, published: true };
  const posts = { posts: { id: 1, title: 'タイトル', content: '内容' }, total: 1 };

  return Response.json(
    { data: posts.posts, meta: { count: posts.total, page: page, limit: POST_LIMIT } },
    { status: 200 },
  );
}
