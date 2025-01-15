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
import { getFormattedDateTime } from '@/lib/datetime';
import { Post } from '@/types/api/posts';

export function PostCard({ post }:{post: Post}) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.public ? "公開 " : "非公開 "}{getFormattedDateTime(post.createdAt)}</CardDescription>
      </CardHeader>
      <CardContent>
        {post.body}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={paths.my.editPost.getHref(post.id)}>
          <Button>Edit</Button>
        </Link>
        <DeletePost id={post.id} />
      </CardFooter>
    </Card>
  )
}
