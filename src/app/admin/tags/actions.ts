'use server';

import { getTagById } from '@/features/posts/models/tag';
import { adminActionClient } from '@/lib/action-client';
import { DatabaseError, ResourceNotFoundError } from '@/lib/errors';
import { Prisma, prisma } from '@/lib/prisma';
import { ZId } from '@/types/common';
import { ZTag } from '@/types/tag';
import { returnValidationErrors } from 'next-safe-action';
import { z } from 'zod';

export const createTag = adminActionClient.inputSchema(ZTag).action(async ({ parsedInput }) => {
  try {
    return await prisma.tag.create({ data: parsedInput });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return returnValidationErrors(ZTag, { _errors: ['スラッグの値は一意にして下さい'] });
      } else {
        throw new DatabaseError(e.message);
      }
    }
    throw e;
  }
});

export const updateTag = adminActionClient.inputSchema(ZTag).action(async ({ parsedInput }) => {
  try {
    const id = parsedInput.id!;
    const tag = await getTagById(id);
    if (!tag) {
      throw new ResourceNotFoundError('Tag', id);
    }

    return await prisma.tag.update({
      where: { id },
      data: parsedInput,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return returnValidationErrors(ZTag, { _errors: ['スラッグの値は一意にして下さい'] });
      } else {
        throw new DatabaseError(e.message);
      }
    }
    throw e;
  }
});

const ZDeleteTag = z.object({ id: ZId });

export const deleteTag = adminActionClient.inputSchema(ZDeleteTag).action(async ({ parsedInput }) => {
  try {
    await prisma.tag.delete({ where: { id: parsedInput.id } });
    return true;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new DatabaseError(e.message);
    }

    throw e;
  }
});
