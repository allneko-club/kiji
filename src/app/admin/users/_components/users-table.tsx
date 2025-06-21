'use client';

import { PaginationBasic } from '@/components/pagination-basic';
import { paths } from '@/config/paths';
import { getFormattedDateTimeFromObj } from '@/lib/datetime';
import { getRoleLabel } from '@/lib/users';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { User } from '@prisma/client';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { DeleteUser } from './delete-user';

type Props = {
  perPage: number;
  users: User[];
  total: number;
};

export const UsersTable = ({ perPage, users, total }: Props) => {
  const router = useRouter();

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">操作</TableCell>
              <TableCell align="right">名前</TableCell>
              <TableCell align="right">メールアドレス</TableCell>
              <TableCell align="right">権限</TableCell>
              <TableCell align="right">登録日時</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Stack spacing={1} direction="row" sx={{ justifyContent: 'flex-end' }}>
                    <IconButton href={paths.admin.users.update.getHref(user.id)} component={NextLink}>
                      <CreateIcon />
                    </IconButton>
                    <DeleteUser id={user.id} />
                  </Stack>
                </TableCell>
                <TableCell
                  align="right"
                  onClick={() => router.push(paths.admin.users.detail.getHref(user.id))}>
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{getRoleLabel(user.role)}</TableCell>
                <TableCell align="right">{getFormattedDateTimeFromObj(user.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationBasic perPage={perPage} total={total} />
    </>
  );
};
