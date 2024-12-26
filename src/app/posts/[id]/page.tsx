import { api } from '@/lib/api-client';
import type { Metadata } from 'next';
import { PostDetail } from '@/app/posts/[id]/_components/post-detail';
import { getQueryClient } from '@/lib/react-query';
import { publicPostOptions } from '@/hooks/posts/post';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id
  const post = await api.get(`/posts/${id}`);
  return { title: post.name }
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
