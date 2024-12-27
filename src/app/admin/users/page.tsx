import { UsersTable } from '@/app/admin/users/_components/users-table';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/react-query';
import { adminUsersOptions } from '@/hooks/admin/user';
import { OrderBy } from '@/config/consts';
import { BaseSearch } from '@/types/api';
import { H1 } from '@/components/ui/header';

export default async function Page() {

  const params: BaseSearch = { perPage: 100, order:'id', orderBy: OrderBy.DESC }
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(adminUsersOptions(params))

  return (<>
    <H1>ユーザー</H1>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersTable params={params} />
    </HydrationBoundary>
  </>);
};
