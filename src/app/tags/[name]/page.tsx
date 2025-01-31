import { PostList } from '@/components/posts';
import { getPostsByTag } from '@/models/post';
import * as React from 'react';
import { POST_LIMIT } from '@/config/consts';

type Props ={
  params: Promise<{ name: string }>
  searchParams?: Promise<{ page?: string; }>;
}

/**
 * [name]タグがある投稿の一覧
 * @param props
 */
export default async function Page(props: Props) {
  const params = await props.params;
  const tagName = params.name;
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const queryParams = { perPage: POST_LIMIT, page, tagName, published: true }
  const {posts, total} = await getPostsByTag(queryParams)

  return (<>
    <h1>{tagName}</h1>
    <PostList perPage={queryParams.perPage} posts={posts} total={total} />
  </>);
};
