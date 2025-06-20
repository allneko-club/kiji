'use client';

import { DeleteCategory } from '@/app/admin/categories/_components/delete-category';
import { paths } from '@/config/paths';
import { getFormattedDateTimeFromObj } from '@/lib/datetime';
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
import { Category } from '@prisma/client';
import Image from 'next/image';
import NextLink from 'next/link';
import * as React from 'react';

type Props = {
  categories: Category[];
};

export const CategoriesTable = ({ categories }: Props) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">操作</TableCell>
              <TableCell align="right">名前</TableCell>
              <TableCell align="right">スラッグ</TableCell>
              <TableCell align="right">画像</TableCell>
              <TableCell align="right">説明</TableCell>
              <TableCell align="right">更新日時</TableCell>
              <TableCell align="right">登録日時</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <Stack spacing={1} direction="row" sx={{ justifyContent: 'flex-end' }}>
                    <IconButton
                      href={paths.admin.categories.update.getHref(category.id)}
                      component={NextLink}>
                      <CreateIcon />
                    </IconButton>
                    <DeleteCategory id={category.id} disabled={category.id === 1} />
                  </Stack>
                </TableCell>
                <TableCell align="right">{category.name}</TableCell>
                <TableCell align="right">{category.slug}</TableCell>
                <TableCell align="right">
                  {category.image && <Image src={category.image} width={30} height={30} alt="" />}
                </TableCell>
                <TableCell align="right">{category.description}</TableCell>
                <TableCell align="right">{getFormattedDateTimeFromObj(category.updatedAt)}</TableCell>
                <TableCell align="right">{getFormattedDateTimeFromObj(category.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
