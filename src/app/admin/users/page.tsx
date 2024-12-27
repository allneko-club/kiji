import { UsersTable } from '@/app/admin/users/_components/users-table';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/react-query';
import { adminUsersOptions } from '@/hooks/admin/user';
import { OrderBy } from '@/config/consts';
import { BaseSearch } from '@/types/api';
import { H1 } from '@/components/ui/header';

type SearchParams ={
  page?: string;
  orderBy?: OrderBy;
}

export default async function Page(props: {
  searchParams?: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const orderBy = searchParams?.orderBy || OrderBy.ASC;
  const params: BaseSearch = { perPage: 100, currentPage, order:'id', orderBy }
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(adminUsersOptions(params))

  return (<>
    <H1>ユーザー</H1>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersTable params={params} />
    </HydrationBoundary>
  </>);
};
