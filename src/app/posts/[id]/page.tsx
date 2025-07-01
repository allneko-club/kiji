import { PostDetail } from '@/app/posts/[id]/_components/post-detail';
import { getPost } from '@/models/post';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  try {
    const post = await getPost(id);
    if (!post) return {};

    return { title: post.title, description: post.excerpt ?? '' };
  } catch {
    return { title: 'Not Found' };
  }
}

export default async function Page({ params }: Props) {
  const id = (await params).id;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return <PostDetail post={post} />;
}
