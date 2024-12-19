import { api } from '@/lib/api-client';
import { UsersTable } from '@/app/admin/users/_components/users-table';

export default async function Page() {
  const data = await api.get('/users');
  const perPage = 100;

  return (<>
    <h1 className="text-xl">ユーザー</h1>
    <UsersTable users={data.users} perPage={perPage} total={data.total} />
  </>);
};
