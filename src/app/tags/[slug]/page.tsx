import { PostList } from '@/components/posts';
import { getPostsByTag } from '@/models/post';
import * as React from 'react';
import { POST_LIMIT } from '@/config/consts';
import { getTagBySlug } from '@/models/tag';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';

type Props = {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ page?: string; }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  try {
    const tag = await getTagBySlug(slug);
    return { title: tag ? `[${tag.name}]タグがある記事` : 'Not Found' };
  } catch {
    return { title: 'Not Found' };
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
  const queryParams = { perPage: POST_LIMIT, page, slug, published: true };
  const tag = await getTagBySlug(slug);
  const { posts, total } = await getPostsByTag(queryParams);

  if (!tag) {
    return notFound();
  }

  return (
    <>
      <Typography variant="h1">{tag.name}</Typography>
      <PostList perPage={queryParams.perPage} posts={posts} total={total} />
    </>
  );
};
