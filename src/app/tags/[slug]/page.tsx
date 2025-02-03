import { PostList } from '@/components/posts';
import { getPostsByTag } from '@/models/post';
import * as React from 'react';
import { POST_LIMIT } from '@/config/consts';
import { getTag } from '@/models/tag';
import { notFound } from 'next/navigation';

type Props ={
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ page?: string; }>;
}

/**
 * [slug]タグがある投稿の一覧
 * @param props
 */
export default async function Page(props: Props) {
  const params = await props.params;
  const slug = params.slug;
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const queryParams = { perPage: POST_LIMIT, page, slug, published: true }
  const tag = await getTag({ slug })
  const {posts, total} = await getPostsByTag(queryParams)

  if(!tag){
    return notFound();
  }

  return (<>
    <h1>{tag.name}</h1>
    <PostList perPage={queryParams.perPage} posts={posts} total={total} />
  </>);
};
