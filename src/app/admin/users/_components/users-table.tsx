'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import dayjs from 'dayjs';
import { PaginationBasic } from '@/components/pagination-basic';
import { paths } from '@/config/paths';
import { useRouter } from 'next/navigation';
import { User } from '@/types/api';

interface UsersTableProps {
  users: User[];
  perPage: number;
  total?: number;
}

export const UsersTable = ({users, perPage, total }: UsersTableProps) => {
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
          <TableRow key={user.id} className="hover:cursor-pointer" onClick={() => router.push(paths.admin.user.getHref(user.id))}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell className="text-right">{dayjs(user.createdAt).format()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <PaginationBasic perPage={perPage} totalPages={total} />
  </>);
};