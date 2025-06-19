'use server';

import { resetPasswordInputSchema } from '@/app/auth/reset-password/schema';
import { paths } from '@/config/paths';
import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'next/navigation';

export async function resetPassword(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: resetPasswordInputSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  redirect(paths.auth.resetPasswordDone.getHref());
}
