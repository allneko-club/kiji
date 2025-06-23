'use server';

import { adminActionClient } from '@/lib/action-client';
import { DatabaseError, ResourceNotFoundError } from '@/lib/errors';
import { Prisma, prisma } from '@/lib/prisma';
import { getPost } from '@/models/post';
import { ZCuid } from '@/schemas/common';
import { ZPost } from '@/schemas/post';
import { z } from 'zod';

export const createPost = adminActionClient.inputSchema(ZPost).action(async ({ parsedInput }) => {
  try {
    const saveData = {
      title: parsedInput.title,
      content: parsedInput.content,
      published: parsedInput.published,
      categoryId: parsedInput.categoryId,
      tags: {
        connect: parsedInput.tagIds.map((id) => {
          return { id };
        }),
      },
      authorId: parsedInput.authorId,
    };

    return await prisma.post.create({ data: saveData });
  } catch (e) {
    // todo エラー処理 存在しないタグIDを指定した場合は例外がスローされる
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new DatabaseError(e.message);
    }
    throw e;
  }
});

export const updatePost = adminActionClient.inputSchema(ZPost).action(async ({ parsedInput }) => {
  try {
    const id = parsedInput.id!;
    const post = await getPost(id);
    if (!post) {
      throw new ResourceNotFoundError('Post', null);
    }

    const saveData = {
      title: parsedInput.title,
      content: parsedInput.content,
      published: parsedInput.published,
      categoryId: parsedInput.categoryId,
      authorId: parsedInput.authorId,
      tags: {
        // 存在しないタグIDを指定した場合は例外がスローされる
        set: parsedInput.tagIds.map((id) => {
          return { id };
        }),
      },
    };

    return await prisma.post.update({
      where: { id: id },
      data: saveData,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new DatabaseError(e.message);
    }
    throw e;
  }
});

const ZDeletePost = z.object({ id: ZCuid });

export const deletePost = adminActionClient.inputSchema(ZDeletePost).action(async ({ parsedInput }) => {
  try {
    await prisma.post.delete({ where: { id: parsedInput.id } });
    return true;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new DatabaseError(e.message);
    }

    throw e;
  }
});
