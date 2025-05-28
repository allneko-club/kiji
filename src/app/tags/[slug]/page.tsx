import { PostList } from '@/components/posts';
import { getPostsByTag } from '@/models/post';
import * as React from 'react';
import { POST_LIMIT } from '@/config/consts';
import { getTag } from '@/models/tag';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = { title: "タグ" };

type Props ={
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ page?: string; }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug
  try {
    const tag = await getTag({ slug })
    return { title: tag ? `[${tag.name}]タグがある記事一覧`: "Not Found" }
  } catch {
    return { title: "Not Found" };
  }
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

  return (
    <div>
      <Typography component="h1" variant="h3">{tag.name}</Typography>
      <PostList perPage={queryParams.perPage} posts={posts} total={total} />
    </div>
  );
};
