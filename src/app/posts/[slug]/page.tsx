import { PostDetail } from '@/app/posts/[slug]/_components/post-detail';
import { getPostBySlug } from '@/models/post';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  try {
    const post = await getPostBySlug(slug);
    if (!post) return {};

    return { title: post.title, description: post.excerpt ?? '' };
  } catch {
    return { title: 'Not Found' };
  }
}

export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <PostDetail post={post} />;
}
