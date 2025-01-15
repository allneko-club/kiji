import { UsersTable } from '@/app/users/_components/users-table';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/react-query';
import { usersOptions, UsersQueryParams } from '@/hooks/users/user';
import UsersFilter from '@/app/users/_components/users-filter';
import SelectSort from '@/components/select-sort';
import { cleanSortParam, UserSortItems } from '@/app/users/utils';
import { USERS_LIMIT } from '@/config/consts';
import { cleanPage, cleanPerPage, cleanUserRole } from '@/lib/query-params';
import SelectPerPage from '@/components/select-per-page';

export default async function Page(props: {
  searchParams?: Promise<UsersQueryParams>;
}) {
  const searchParams = await props.searchParams;
  const params = {
    perPage: cleanPerPage(searchParams?.perPage, USERS_LIMIT),
    page: cleanPage(searchParams?.page),
    id: searchParams?.id || '',
    name: decodeURIComponent(searchParams?.name || ''),
    email: searchParams?.email || '',
    role: cleanUserRole(searchParams?.role),
    registeredFrom: searchParams?.registeredFrom,
    registeredTo: searchParams?.registeredTo,
  };

  const defaultValues = {
    ...params,
    sort: cleanSortParam(searchParams?.sort),
    registeredFrom: searchParams?.registeredFrom ? new Date(searchParams.registeredFrom) : undefined,
    registeredTo: searchParams?.registeredTo ? new Date(searchParams.registeredTo) : undefined,
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(usersOptions(params));

  return (<>
    <h1>ユーザー</h1>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersFilter defaultValues={defaultValues} />
      <div className="p-3 grid grid-cols-2 gap-4">
        <SelectSort selectItems={UserSortItems} />
        <SelectPerPage selectItems={[30, 50, 100]}/>
      </div>
      <UsersTable params={params} />
    </HydrationBoundary>
  </>);
};
