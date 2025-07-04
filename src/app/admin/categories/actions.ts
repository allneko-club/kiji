'use server';

import { getCategoryById } from '@/features/posts/models/category';
import { adminActionClient } from '@/lib/action-client';
import { env } from '@/lib/env';
import { DatabaseError, ResourceNotFoundError } from '@/lib/errors';
import { Prisma, prisma } from '@/lib/prisma';
import { ZCategory } from '@/types/category';
import { ZId } from '@/types/common';
import { returnValidationErrors } from 'next-safe-action';
import { z } from 'zod';

export const createCategory = adminActionClient.inputSchema(ZCategory).action(async ({ parsedInput }) => {
  try {
    return await prisma.category.create({ data: parsedInput });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return returnValidationErrors(ZCategory, { _errors: ['スラッグの値は一意にして下さい'] });
      } else {
        throw new DatabaseError(e.message);
      }
    }
    throw e;
  }
});

export const updateCategory = adminActionClient.inputSchema(ZCategory).action(async ({ parsedInput }) => {
  try {
    const id = parsedInput.id!;
    const category = await getCategoryById(id);
    if (!category) {
      throw new ResourceNotFoundError('Category', id);
    }

    return await prisma.category.update({
      where: { id },
      data: parsedInput,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return returnValidationErrors(ZCategory, { _errors: ['スラッグの値は一意にして下さい'] });
      } else {
        throw new DatabaseError(e.message);
      }
    }
    throw e;
  }
});

const ZDeleteCategory = z.object({ id: ZId });

export const deleteCategory = adminActionClient
  .inputSchema(ZDeleteCategory)
  .action(async ({ parsedInput }) => {
    try {
      const id = parsedInput.id;
      await prisma.$transaction(async (tx) => {
        const deleteCategory = await getCategoryById(id);
        if (!deleteCategory) {
          throw new ResourceNotFoundError('Category', id);
        }

        await tx.post.updateMany({
          where: { categoryId: id },
          data: { categoryId: env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID },
        });

        await tx.category.update({
          where: { id: env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID },
          data: { count: { increment: deleteCategory.count } },
        });

        await tx.category.delete({ where: { id: id } });
      });
      return true;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DatabaseError(e.message);
      }

      throw e;
    }
  });
