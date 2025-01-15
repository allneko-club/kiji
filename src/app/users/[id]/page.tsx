import { getQueryClient } from '@/lib/react-query';
import { userOptions } from '@/hooks/users/user';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { UserInfo } from '@/app/users/[id]/_components/user-info';

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const id = (await params).id
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(userOptions(id))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserInfo id={id} />
    </HydrationBoundary>
  );
};
