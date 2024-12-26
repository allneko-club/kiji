import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription, CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Post } from '@/types/api';
import Link from 'next/link';
import { paths } from '@/config/paths';
import { Button } from '@/components/ui/button';
import { getFormattedDateTime } from '@/lib/datetime';

export function PostCard({ post }:{post: Post}) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{getFormattedDateTime(post.createdAt)}</CardDescription>
      </CardHeader>
      <CardContent>
        {post.body}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={paths.post.getHref(post.id)}>
          <Button>Detail</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
