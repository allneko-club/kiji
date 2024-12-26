'use client'
import * as React from "react"
import { usePublicPost } from '@/hooks/posts/post';
import { notFound } from 'next/navigation';
import { getFormattedDateTime } from '@/lib/datetime';

export function PostDetail({ id }:{id: string}) {

  const { data: post} = usePublicPost(id)

  if (!post) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight">{post.title}</h1>
      <p>{post.author.name}</p>
      <p>{post.public ? "公開" : "非公開"}</p>
      <p>{getFormattedDateTime(post.createdAt)}</p>
      <p>{post.body}</p>
    </div>
  )
}
