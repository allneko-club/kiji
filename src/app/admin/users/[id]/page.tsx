import { Metadata } from 'next';
import { getQueryClient } from '@/lib/react-query';
import { userOptions } from '@/hooks/user';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { UserInfo } from '@/app/admin/users/[id]/_components/user-info';

type Props = {
  params: Promise<{ id: string }>
}

// 参考 https://github.com/TanStack/query/discussions/7313
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id
  const queryClient = getQueryClient()
  try {
    const user = await queryClient.fetchQuery(userOptions(id))
    return { title: user.name }
  } catch {
    return { title: "Not Found" };
  }
}

export default async function Page({ params }: Props) {
  const queryClient = getQueryClient()
  const id = (await params).id
  void queryClient.prefetchQuery(userOptions(id))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserInfo id={id} />
    </HydrationBoundary>
  );
};
