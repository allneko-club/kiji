'use client';
import { PaginationBasic } from '@/components/pagination-basic';
import { paths } from '@/config/paths';
import { useRouter } from 'next/navigation';
import { getFormattedDateTimeFromObj } from '@/lib/datetime';
import type { User } from '@prisma/client';
import { getRoleLabel } from '@/config/consts';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

type Props = {
  perPage: number;
  users: User[];
  total: number;
}

export const UsersTable = ({ perPage, users, total }: Props) => {
  const router = useRouter();

  return (<>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">名前</TableCell>
            <TableCell align="right">メールアドレス</TableCell>
            <TableCell align="right">権限</TableCell>
            <TableCell align="right">登録日時</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => router.push(paths.admin.users.detail.getHref(user.id))}
            >
              <TableCell align="right">{user.name}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{getRoleLabel(user.role)}</TableCell>
              <TableCell align="right">{getFormattedDateTimeFromObj(user.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <PaginationBasic perPage={perPage} total={total} />
  </>);
};