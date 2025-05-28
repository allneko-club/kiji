'use client'
import * as React from "react"
import { getFormattedDateTimeFromObj } from '@/lib/datetime';
import { ScrollToTop } from '@/components/layouts/scroll-to-top';
import { Category, Post, Tag, User } from '@prisma/client';
import { Author } from '@/app/posts/[id]/_components/author';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

type Props = {
  post: Post & { author: User, category: Category, tags: Tag[] };
}

export function PostDetail({ post }: Props) {

  return (
    <article>
      <Typography component="h1" variant="h3">{post.title}</Typography>
      <div>{getFormattedDateTimeFromObj(post.createdAt)}</div>
      <div>{post.category.name}</div>
      <div>
        {post.tags.map((tag) =>
          <Chip key={tag.id} label={tag.name} />
        )}
      </div>

      <Author user={post.author} />
      <div>
        {post.content}
      </div>

      <ScrollToTop/>
    </article>
  )
}
