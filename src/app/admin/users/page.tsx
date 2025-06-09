import { UsersTable } from '@/app/admin/users/_components/users-table';
import UsersFilter from '@/app/admin/users/_components/users-filter';
import SelectSort from '@/components/select-sort';
import { Role, USERS_LIMIT_LIST } from '@/config/consts';
import { cleanOrderBy, cleanPage, cleanPerPage } from '@/lib/query-params';
import SelectLimit from '@/components/select-limit';
import { getUsers } from '@/models/user';
import { cleanOrder, cleanRole } from '@/app/admin/users/clean';
import { BaseSearch } from '@/types/requests';
import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import { paths } from '@/config/paths';
import Box from '@mui/material/Box';

export const metadata: Metadata = { title: 'ユーザー' };

const UserSortItems = {
  'registered_asc': '登録日(昇順)',
  'registered_desc': '登録日(降順)',
  'name_asc': '名前(昇順)',
  'name_desc': '名前(降順)',
} as const;

interface SearchParams extends BaseSearch {
  id?: string;
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
    page: cleanPage(searchParams?.page),
    perPage: cleanPerPage(searchParams?.perPage, USERS_LIMIT_LIST),
    order: cleanOrder(searchParams?.order),
    orderBy: cleanOrderBy(searchParams?.orderBy),
    id: searchParams?.id,
    name: decodeURIComponent(searchParams?.name || ''),
    email: searchParams?.email || '',
    role: cleanRole(searchParams?.role),
    registeredFrom: searchParams?.registeredFrom ? new Date(searchParams?.registeredFrom) : undefined,
    registeredTo: searchParams?.registeredTo ? new Date(searchParams?.registeredTo) : undefined,
  };

  const defaultValues = {
    id: params.id ? params.id : '',
    name: params.name,
    email: params.email,
    role: params.role,
    registeredFrom: params.registeredFrom,
    registeredTo: params.registeredTo,
  };

  const { users, total } = await getUsers(params);

  return (
    <>
      <Typography variant="h1">ユーザー</Typography>
      <Button
        variant="contained"
        component={NextLink}
        href={paths.auth.register.getHref()}
      >
        追加
      </Button>

      <Box sx={{ p: 2, my: 2, border: '1px dashed grey' }}>
        <UsersFilter defaultValues={defaultValues} />
      </Box>

      <Grid container spacing={2}>
        <Grid size={6}>
          <SelectSort selectItems={UserSortItems} />
        </Grid>
        <Grid size={6}>
          <SelectLimit limitList={USERS_LIMIT_LIST} />
        </Grid>
      </Grid>
      <UsersTable perPage={params.perPage} users={users} total={total} />
    </>
  );
};
