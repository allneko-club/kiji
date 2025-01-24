import { UsersTable } from '@/app/users/_components/users-table';
import UsersFilter from '@/app/users/_components/users-filter';
import SelectSort from '@/components/select-sort';
import { cleanSortParam, UserSortItems } from '@/app/users/utils';
import { Role, USERS_LIMIT_LIST } from '@/config/consts';
import { cleanPage, cleanPerPage, cleanRole } from '@/lib/query-params';
import SelectPerPage from '@/components/select-per-page';
import { getUsers } from '@/services/users/model';
import { BaseSearch } from '@/types/api';

interface SearchParams extends BaseSearch {
  id?: string;
  sort?: string;
  name?: string,
  email?: string,
  role?: Role,
  registeredFrom?: string,
  registeredTo?: string,
}

export default async function Page(props: {
  searchParams?: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const params = {
    perPage: cleanPerPage(searchParams?.perPage, USERS_LIMIT_LIST),
    page: cleanPage(searchParams?.page),
    id: searchParams?.id || '',
    name: decodeURIComponent(searchParams?.name || ''),
    email: searchParams?.email || '',
    role: cleanRole(searchParams?.role),
    registeredFrom: searchParams?.registeredFrom,
    registeredTo: searchParams?.registeredTo,
  };

  const defaultValues = {
    ...params,
    sort: cleanSortParam(searchParams?.sort),
    registeredFrom: searchParams?.registeredFrom ? new Date(searchParams.registeredFrom) : undefined,
    registeredTo: searchParams?.registeredTo ? new Date(searchParams.registeredTo) : undefined,
  }

  const {users, total} = await getUsers(params)

  return (<>
    <h1>ユーザー</h1>
      <UsersFilter defaultValues={defaultValues} />
      <div className="p-3 grid grid-cols-2 gap-4">
        <SelectSort selectItems={UserSortItems} />
        <SelectPerPage selectItems={USERS_LIMIT_LIST}/>
      </div>
      <UsersTable params={params} users={users} total={total} />
  </>);
};
