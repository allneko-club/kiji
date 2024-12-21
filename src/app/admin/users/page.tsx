import { UsersTable } from '@/app/admin/users/_components/users-table';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/react-query';
import { usersOptions } from '@/hooks/user';
import { OrderBy } from '@/config/consts';
import { BaseSearch } from '@/types/api';

export default async function Page() {

  const params: BaseSearch = { perPage: 100, order:'id', orderBy: OrderBy.DESC }
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(usersOptions(params))

  return (<>
    <h1 className="text-xl">ユーザー</h1>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersTable params={params} />
    </HydrationBoundary>
  </>);
};
