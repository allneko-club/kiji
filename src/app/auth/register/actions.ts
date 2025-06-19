'use server';

import { registerInputSchema } from '@/app/auth/register/schema';
import { paths } from '@/config/paths';
import { prisma } from '@/lib/prisma';
import { Role } from '@/lib/users';
import { hash } from '@/lib/utils';
import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'next/navigation';

export async function register(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: registerInputSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply({ formErrors: ['入力に誤りがあります。'] });
  }

  await prisma.user.create({
    data: {
      name: submission.value.name,
      email: submission.value.email,
      role: Role.USER,
      password: hash(submission.value.password),
    },
  });

  redirect(paths.auth.login.getHref());
}
