'use client'
import * as React from "react"
import { getFormattedDateTimeFromObj } from '@/lib/datetime';
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
      <Typography variant="h1">{post.title}</Typography>

      <Author author={post.author} created={getFormattedDateTimeFromObj(post.createdAt)} />

      <Chip size="medium" label={post.category.name}/>

      <div>
        {post.tags.map((tag) =>
          <Chip key={tag.id} label={`#${tag.name}`} />
        )}
      </div>

      <div>
        {post.content}
      </div>
    </article>
  )
}
