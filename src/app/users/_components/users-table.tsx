'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginationBasic } from '@/components/pagination-basic';
import { paths } from '@/config/paths';
import { useRouter } from 'next/navigation';
import { getFormattedDateTimeFromObj } from '@/lib/datetime';
import type { User } from '@prisma/client'
import { getRoleLabel } from '@/config/consts';

type Props = {
  perPage: number;
  users: User[];
  total: number;
}

export const UsersTable = ({perPage, users, total}: Props) => {
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
        {users.map(user => (
          <TableRow
            key={user.id}
            className="hover:cursor-pointer"
            onClick={() => router.push(paths.users.user.getHref(user.id))}
          >
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{getRoleLabel(user.role)}</TableCell>
            <TableCell className="text-right">{getFormattedDateTimeFromObj(user.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <PaginationBasic perPage={perPage} totalPages={total} />
  </>);
};