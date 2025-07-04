'use server';

import { getPostById } from '@/features/posts/models/post';
import { adminActionClient } from '@/lib/action-client';
import { DatabaseError, ResourceNotFoundError } from '@/lib/errors';
import { Prisma, prisma } from '@/lib/prisma';
import { ZCuid } from '@/types/common';
import { ZPost } from '@/types/post';
import { z } from 'zod';

export const createPost = adminActionClient.inputSchema(ZPost).action(async ({ parsedInput }) => {
  try {
    const saveData = {
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

    return await prisma.$transaction([
      prisma.post.create({ data: saveData }),
      prisma.category.update({
        where: { id: parsedInput.categoryId },
        data: { count: { increment: 1 } },
      }),
      prisma.tag.updateMany({
        where: { id: { in: parsedInput.tagIds } },
        data: { count: { increment: 1 } },
      }),
    ]);
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
    const post = await getPostById(id);
    if (!post) {
      throw new ResourceNotFoundError('Post', null);
    }

    const newTagIds = parsedInput.tagIds.sort();
    const oldTagIds = post.tags.map((tag) => tag.id).sort();
    const addedTagIds = newTagIds.filter((i) => oldTagIds.indexOf(i) == -1);
    const deleteTagIds = oldTagIds.filter((i) => newTagIds.indexOf(i) == -1);

    const saveData = {
      title: parsedInput.title,
      content: parsedInput.content,
      excerpt: parsedInput.excerpt,
      slug: parsedInput.slug,
      published: parsedInput.published,
      categoryId: parsedInput.categoryId,
      authorId: parsedInput.authorId,
    } as Prisma.PostUpdateInput;

    if (newTagIds.toString() !== oldTagIds.toString()) {
      saveData.tags = {
        set: newTagIds.map((id) => {
          return { id };
        }),
      };
    }

    const transactionArray: any = [
      prisma.post.update({
        where: { id: id },
        data: saveData,
      }),
    ];
    const isCategoryChanged = post.categoryId !== parsedInput.categoryId;
    if (isCategoryChanged) {
      transactionArray.push(
        prisma.category.update({
          where: { id: parsedInput.categoryId },
          data: { count: { increment: 1 } },
        }),
        prisma.category.update({
          where: { id: post.categoryId },
          data: { count: { decrement: 1 } },
        }),
      );
    }

    if (addedTagIds) {
      transactionArray.push(
        prisma.tag.updateMany({
          where: { id: { in: addedTagIds } },
          data: { count: { increment: 1 } },
        }),
      );
    }

    if (deleteTagIds) {
      transactionArray.push(
        prisma.tag.updateMany({
          where: { id: { in: deleteTagIds } },
          data: { count: { decrement: 1 } },
        }),
      );
    }

    return await prisma.$transaction(transactionArray);
  } catch (e) {
    // 存在しないタグIDを指定した場合は例外がスローされる
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new DatabaseError(e.message);
    }
    throw e;
  }
});

const ZDeletePost = z.object({ id: ZCuid });

export const deletePost = adminActionClient.inputSchema(ZDeletePost).action(async ({ parsedInput }) => {
  try {
    const post = await prisma.post.findUnique({
      include: { tags: true },
      where: { id: parsedInput.id },
    });
    if (!post) {
      throw new ResourceNotFoundError('Post', null);
    }

    await prisma.$transaction([
      prisma.post.delete({ where: { id: parsedInput.id } }),
      prisma.category.update({
        where: { id: post.categoryId },
        data: { count: { decrement: 1 } },
      }),
      prisma.tag.updateMany({
        where: { id: { in: post.tags.map((tag) => tag.id) } },
        data: { count: { decrement: 1 } },
      }),
    ]);
    return true;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new DatabaseError(e.message);
    }

    throw e;
  }
});
