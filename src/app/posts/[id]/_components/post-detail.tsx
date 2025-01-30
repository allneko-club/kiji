'use client'
import * as React from "react"
import { getFormattedDateTimeFromObj } from '@/lib/datetime';
import { ScrollToTop } from '@/components/layouts/scroll-to-top';
import { Post, Tag, User } from '@prisma/client';
import { paths } from '@/config/paths';
import TagBadge from '@/components/tag-badge';
import { Author } from '@/app/posts/[id]/_components/author';

type Props = {
  post: Post & { author: User, tags: Tag[] };
}

export function PostDetail({ post }: Props) {

  return (
    <article>
      <h1>{post.title}</h1>
      <div className="text-muted-foreground">{getFormattedDateTimeFromObj(post.createdAt)}</div>
      <div className="space-x-2">
        {post.tags.map((tag) => (
          <TagBadge key={tag.id} name={tag.name} href={paths.home.getHref() + `?tag=${tag.name}`} />
        ))}
      </div>

      <Author user={post.author} />
      <div className="p-4 bg-white dark:bg-slate-800 rounded-md">
        <p>{post.content}</p>
      </div>

      <ScrollToTop/>
    </article>
  )
}
