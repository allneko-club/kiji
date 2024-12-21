import { UpdatePostForm } from '@/app/my/posts/[id]/_components/update-post-form';
import { auth } from '@/auth';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/react-query';
import { postOptions } from '@/hooks/posts/post';

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const session = await auth()
  const id = (await params).id
  const userId = session?.user.id

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(postOptions(id))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UpdatePostForm id={id} userId={userId} />
    </HydrationBoundary>
  );
};
