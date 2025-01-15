import * as React from "react"
import Link from 'next/link';
import { paths } from '@/config/paths';
import { getFormattedDateTime } from '@/lib/datetime';
import { Post } from '@/types/api/posts';

export function PostCard({ post }:{post: Post}) {

  return (
    <article>
      <Link
        href={paths.post.getHref(post.id)}
        className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left transition-all hover:bg-accent"
      >
        <h2>{post.title}</h2>
        <span className="text-sm">#カテゴリー1</span>
        <span className="text-sm text-muted-foreground">
          {getFormattedDateTime(post.createdAt)}
        </span>
        <p>
          {post.body}
        </p>
      </Link>
    </article>
  )
}
