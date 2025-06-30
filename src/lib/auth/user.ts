import { DatabaseError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';
import { hash } from '@/lib/utils';
import { Prisma } from '@prisma/client';
import { cache } from 'react';

export const getUserByCredentials = cache(async (email: string, password: string) => {
  try {
    return await prisma.user.findFirst({
      where: {
        email,
        password: hash(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new DatabaseError(error.message);
    }
    throw error;
  }
});
