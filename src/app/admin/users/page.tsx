import UsersFilter from '@/app/admin/users/_components/users-filter';
import { UsersTable } from '@/app/admin/users/_components/users-table';
import { cleanOrder, cleanRole } from '@/app/admin/users/clean';
import SelectLimit from '@/components/select-limit';
import SelectSort from '@/components/select-sort';
import { getUsersByFilter } from '@/features/users/models/user';
import { Role } from '@/features/users/roles';
import { paths } from '@/lib/paths';
import { cleanOrderBy, cleanPage, cleanPerPage } from '@/lib/query-params';
import { BaseSearch } from '@/types/requests';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import NextLink from 'next/link';

export const metadata: Metadata = { title: 'ユーザー' };

const UserSortItems = {
  registered_asc: '登録日(昇順)',
  registered_desc: '登録日(降順)',
  name_asc: '名前(昇順)',
  name_desc: '名前(降順)',
} as const;

interface SearchParams extends BaseSearch {
  id?: string;
  name?: string;
  email?: string;
  role?: Role;
  registeredFrom?: string;
  registeredTo?: string;
}

// ユーザー一覧の表示件数のリスト 要素は1つ以上
const USERS_LIMIT_LIST = [10, 25, 50];

export default async function Page(props: { searchParams?: Promise<SearchParams> }) {
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

  const { users, total } = await getUsersByFilter(params);

  return (
    <>
      <Typography variant="h1">ユーザー</Typography>
      <Button variant="contained" component={NextLink} href={paths.auth.register.getHref()}>
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
}
