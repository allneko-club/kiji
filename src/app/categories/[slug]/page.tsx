import { PostList } from '@/components/posts';
import { POST_LIMIT } from '@/lib/consts';
import { getCategoryBySlug } from '@/models/category';
import { getPostsByCategory } from '@/models/post';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import * as React from 'react';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  try {
    const category = await getCategoryBySlug(slug);
    return { title: category ? `[${category.name}]カテゴリーがある記事` : 'Not Found' };
  } catch {
    return { title: 'Not Found' };
  }
}

/**
 * [slug]カテゴリーがある投稿の一覧
 * @param props
 */
export default async function Page(props: Props) {
  const params = await props.params;
  const slug = params.slug;
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const queryParams = { perPage: POST_LIMIT, page, slug, published: true };
  const [category, { posts, total }] = await Promise.all([
    getCategoryBySlug(slug),
    getPostsByCategory(queryParams),
  ]);

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Typography variant="h1">{category.name}</Typography>
      <PostList perPage={queryParams.perPage} posts={posts} total={total} />
    </>
  );
}
