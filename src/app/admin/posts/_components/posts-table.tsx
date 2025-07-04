'use client';

import { DeletePost } from '@/app/admin/posts/_components/delete-post';
import { PaginationBasic } from '@/components/pagination-basic';
import { getFormattedDateTimeFromObj } from '@/lib/datetime';
import { paths } from '@/lib/paths';
import { PostWithCategoryAuthor } from '@/types/post';
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
import NextLink from 'next/link';
import * as React from 'react';

type Props = {
  perPage: number;
  posts: PostWithCategoryAuthor[];
  total: number;
};

export const PostsTable = ({ perPage, posts, total }: Props) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">操作</TableCell>
              <TableCell align="right">タイトル</TableCell>
              <TableCell align="right">カテゴリー</TableCell>
              <TableCell align="right">投稿者</TableCell>
              <TableCell align="right">日付</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right">
                  <Stack spacing={1} direction="row" sx={{ justifyContent: 'flex-end' }}>
                    <IconButton href={paths.admin.posts.update.getHref(post.id)} component={NextLink}>
                      <CreateIcon />
                    </IconButton>
                    <DeletePost id={post.id} />
                  </Stack>
                </TableCell>
                <TableCell align="right">{post.title}</TableCell>
                <TableCell align="right">{post.category?.name}</TableCell>
                <TableCell align="right">{post.author.name}</TableCell>
                <TableCell align="right">
                  {post.published ? '公開済み' : '非公開'}
                  <br />
                  {getFormattedDateTimeFromObj(post.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationBasic perPage={perPage} total={total} />
    </>
  );
};
