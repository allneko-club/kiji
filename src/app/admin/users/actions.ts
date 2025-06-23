'use server';

import { adminActionClient } from '@/lib/action-client';
import { DatabaseError, ResourceNotFoundError } from '@/lib/errors';
import { Prisma, prisma } from '@/lib/prisma';
import { getUser } from '@/models/user';
import { ZCuid } from '@/schemas/common';
import { ZUpdateUser } from '@/schemas/user';
import { returnValidationErrors } from 'next-safe-action';
import { z } from 'zod';

export const updateUser = adminActionClient.inputSchema(ZUpdateUser).action(async ({ parsedInput }) => {
  try {
    const id = parsedInput.id!;
    const user = await getUser(id);
    if (!user) {
      throw new ResourceNotFoundError('User', id);
    }

    const role = Number(parsedInput.role);
    return await prisma.user.update({
      where: { id },
      data: { ...parsedInput, role: role },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return returnValidationErrors(ZUpdateUser, { _errors: ['このメールアドレスは使用されています'] });
      } else {
        throw new DatabaseError(e.message);
      }
    }
    throw e;
  }
});

const ZDeleteUser = z.object({ id: ZCuid });

export const deleteUser = adminActionClient.inputSchema(ZDeleteUser).action(async ({ parsedInput }) => {
  try {
    // todo 投稿したpostも同時に削除するか？
    await prisma.user.delete({ where: { id: parsedInput.id } });
    return true;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new DatabaseError(e.message);
    }

    throw e;
  }
});
