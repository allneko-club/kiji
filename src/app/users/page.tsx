import { UsersTable } from '@/app/users/_components/users-table';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/react-query';
import { usersOptions } from '@/hooks/users/user';
import { OrderBy } from '@/config/consts';
import { BaseSearch } from '@/types/api';

type SearchParams ={
  page?: string;
  orderBy?: OrderBy;
}

export default async function Page(props: {
  searchParams?: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const orderBy = searchParams?.orderBy || OrderBy.ASC;
  const params: BaseSearch = { perPage: 100, page: page, order:'id', orderBy }
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(usersOptions(params))

  return (<>
    <h1>ユーザー</h1>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersTable params={params} />
    </HydrationBoundary>
  </>);
};
