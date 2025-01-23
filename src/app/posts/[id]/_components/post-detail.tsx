'use client'
import * as React from "react"
import { getFormattedDateTimeFromObj } from '@/lib/datetime';
import { ScrollToTop } from '@/components/layouts/scroll-to-top';
import { Post, User } from '@prisma/client';

type Props = {
  post: Post & { author: User };
}

export function PostDetail({ post }: Props) {

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.author.name}</p>
      <p>{post.published ? "公開" : "非公開"}</p>
      <p>{getFormattedDateTimeFromObj(post.createdAt)}</p>
      <p>{post.content}</p>
      <ScrollToTop/>
    </article>
  )
}
