'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginationBasic } from '@/components/pagination-basic';
import { paths } from '@/config/paths';
import { getFormattedDateTimeFromObj } from '@/lib/datetime';
import type { Post } from '@prisma/client'
import { Button } from '@/components/ui/button';
import { DeletePost } from '@/app/my/posts/_components/delete-post';
import * as React from 'react';
import Link from 'next/link';
import { PencilLine } from 'lucide-react';

export const PostsTable = ({perPage, posts, total}: {perPage: number, posts: Post[], total: number}) => {

  return (<>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>操作</TableHead>
          <TableHead>タイトル</TableHead>
          <TableHead className="w-[100px]">公開</TableHead>
          <TableHead>日付</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map(post => (
          <TableRow key={post.id}>
            <TableCell className="w-[170px]">
              <div className="space-x-2">
                <Button asChild size="icon">
                  <Link href={paths.my.editPost.getHref(post.id)}>
                    <PencilLine />
                  </Link>
                </Button>
                <DeletePost id={post.id} />
              </div>
            </TableCell>
            <TableCell className="font-medium">{post.title}</TableCell>
            <TableCell>{post.published ? '公開' : '非公開'}</TableCell>
            <TableCell>{getFormattedDateTimeFromObj(post.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <PaginationBasic perPage={perPage} totalPages={total} />
  </>);
};