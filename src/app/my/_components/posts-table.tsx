'use client'
import NextLink from 'next/link'
import CreateIcon from '@mui/icons-material/Create';
import { PaginationBasic } from '@/components/pagination-basic';
import { paths } from '@/config/paths';
import { getFormattedDateTimeFromObj } from '@/lib/datetime';
import type { Post } from '@prisma/client'
import { DeletePost } from '@/app/my/posts/_components/delete-post';
import * as React from 'react';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export const PostsTable = ({perPage, posts, total}: {perPage: number, posts: Post[], total: number}) => {

  return (<>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>操作</TableCell>
            <TableCell align="right">タイトル</TableCell>
            <TableCell align="right">公開</TableCell>
            <TableCell align="right">日付</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow
              key={post.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <IconButton href={paths.my.editPost.getHref(post.id)} component={NextLink}>
                  <CreateIcon/>
                </IconButton>
                <DeletePost id={post.id} />
              </TableCell>
              <TableCell align="right">{post.title}</TableCell>
              <TableCell align="right">{post.published ? '公開' : '非公開'}</TableCell>
              <TableCell align="right">{getFormattedDateTimeFromObj(post.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <PaginationBasic perPage={perPage} total={total} />
  </>);
};