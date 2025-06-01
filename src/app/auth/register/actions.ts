'use server';
import { redirect } from 'next/navigation';
import { paths } from '@/config/paths';
import { parseWithZod } from '@conform-to/zod';
import { registerInputSchema } from '@/app/auth/register/schema';
import { prisma } from '@/lib/prisma';
import { Role } from '@/config/consts';
import { hash } from '@/lib/utils';

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