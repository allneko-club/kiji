import type { Metadata } from 'next';
import { PostDetail } from '@/app/posts/[id]/_components/post-detail';
import { getQueryClient } from '@/lib/react-query';
import { publicPostOptions } from '@/hooks/posts/post';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

type Props = {
  params: Promise<{ id: string }>
}

// 参考 https://github.com/TanStack/query/discussions/7313
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id
  const queryClient = getQueryClient()
  try {
    const post = await queryClient.fetchQuery(publicPostOptions(id))
    return { title: post.title }
  } catch {
    return { title: "Not Found" };
  }
}

export default async function Page({ params }: Props) {
  const id = (await params).id
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(publicPostOptions(id))

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostDetail id={id} />
      </HydrationBoundary>
    </div>
  );
};
