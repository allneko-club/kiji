import { getQueryClient } from '@/lib/react-query';
import { adminUserOptions } from '@/hooks/admin/user';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { UserInfo } from '@/app/admin/users/[id]/_components/user-info';

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const id = (await params).id
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(adminUserOptions(id))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserInfo id={id} />
    </HydrationBoundary>
  );
};
