'use server';

import { adminActionClient } from '@/lib/action-client';
import { ZCuid } from '@/types/common';
import { ZPost } from '@/types/post';
import { z } from 'zod';

export const createPost = adminActionClient.inputSchema(ZPost).action(async ({ parsedInput }) => {
  return {
    title: parsedInput.title,
    content: parsedInput.content,
    excerpt: parsedInput.excerpt,
    slug: parsedInput.slug,
    published: parsedInput.published,
    categoryId: parsedInput.categoryId,
    tags: {
      connect: parsedInput.tagIds.map((id) => {
        return { id };
      }),
    },
    authorId: parsedInput.authorId,
  };
});

export const updatePost = adminActionClient.inputSchema(ZPost).action(async ({ parsedInput }) => {
  return {
    title: parsedInput.title,
    content: parsedInput.content,
    excerpt: parsedInput.excerpt,
    slug: parsedInput.slug,
    published: parsedInput.published,
    categoryId: parsedInput.categoryId,
    tags: {
      connect: parsedInput.tagIds.map((id) => {
        return { id };
      }),
    },
    authorId: parsedInput.authorId,
  };
});

const ZDeletePost = z.object({ id: ZCuid });

export const deletePost = adminActionClient.inputSchema(ZDeletePost).action(async ({ parsedInput }) => {
  return true;
});
