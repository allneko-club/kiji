'use server';

import { actionClient } from '@/lib/action-client';
import { sendRegisteredEmail } from '@/lib/email';
import { DatabaseError } from '@/lib/errors';
import { Prisma, prisma } from '@/lib/prisma';
import { Role } from '@/lib/users';
import { hash } from '@/lib/utils';
import { ZRegister, ZUpdateUser } from '@/schemas/user';
import { returnValidationErrors } from 'next-safe-action';

export const register = actionClient.inputSchema(ZRegister).action(async ({ parsedInput }) => {
  try {
    await prisma.user.create({
      data: {
        name: parsedInput.name,
        email: parsedInput.email,
        role: Role.USER,
        password: hash(parsedInput.password),
      },
    });
    await sendRegisteredEmail({ email: parsedInput.email });
    return true;
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
