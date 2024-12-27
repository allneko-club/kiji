'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginationBasic } from '@/components/pagination-basic';
import { paths } from '@/config/paths';
import { useRouter } from 'next/navigation';
import { useAdminUsers } from '@/hooks/admin/user';
import { BaseSearch } from '@/types/api';
import { getFormattedDateTime } from '@/lib/datetime';

export const UsersTable = ({params}: {params: BaseSearch}) => {
  const { data } = useAdminUsers(params);
  const router = useRouter()

  return (<>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>名前</TableHead>
          <TableHead>メールアドレス</TableHead>
          <TableHead>権限</TableHead>
          <TableHead className="text-right">登録日時</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.users.map(user => (
          <TableRow key={user.id} className="hover:cursor-pointer" onClick={() => router.push(paths.admin.user.getHref(user.id))}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell className="text-right">{getFormattedDateTime(user.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <PaginationBasic perPage={params.perPage} totalPages={data.total} />
  </>);
};