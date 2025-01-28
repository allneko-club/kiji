import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription, CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { paths } from '@/config/paths';
import { DeletePost } from '@/app/my/posts/_components/delete-post';
import { getFormattedDateTimeFromObj } from '@/lib/datetime';
import { Post } from '@prisma/client';


export function PostCard({ post }:{post: Post}) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>
          {post.published ? "公開 " : "非公開 "}{getFormattedDateTimeFromObj(post.createdAt)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {post.content}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={paths.my.editPost.getHref(post.id)}>
          <Button>編集</Button>
        </Link>
        <DeletePost id={post.id} />
      </CardFooter>
    </Card>
  )
}
