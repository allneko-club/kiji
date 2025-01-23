import type { Metadata } from 'next';
import { PostDetail } from '@/app/posts/[id]/_components/post-detail';
import { getPost } from '@/services/posts/model';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>
}

// 参考 https://github.com/TanStack/query/discussions/7313
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id
  try {
    const post = await getPost(id);
    return { title: post ? post.title: "Not Found" }
  } catch {
    return { title: "Not Found" };
  }
}

export default async function Page({ params }: Props) {
  const id = (await params).id
  const post = await getPost(id);

  if (!post) {
    notFound()
  }

  return (
    <PostDetail post={post} />
  );
};
