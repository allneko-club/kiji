import { Search } from '@/app/posts/search';
import { PostList } from '@/components/posts';
import { POST_LIMIT } from '@/lib/consts';
import { getPosts } from '@/models/post';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = { title: '記事一覧' };

type SearchParams = {
  page?: string;
  query?: string;
};

export default async function Page(props: { searchParams?: Promise<SearchParams> }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const query = searchParams?.query;
  const params = { perPage: POST_LIMIT, page, title: query, published: true };
  const { posts, total } = await getPosts(params);

  return (
    <>
      <Typography variant="h1">投稿</Typography>
      <Typography>新着の投稿順</Typography>

      <div>
        <Search />
      </div>
      <PostList perPage={params.perPage} posts={posts} total={total} />
    </>
  );
}
