'use server';
import { redirect } from 'next/navigation';
import { paths } from '@/config/paths';
import { parseWithZod } from '@conform-to/zod';
import { resetPasswordInputSchema } from '@/app/auth/reset-password/schema';

export async function resetPassword(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: resetPasswordInputSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply({ formErrors: ['入力に誤りがあります。'] });
  }

  redirect(paths.auth.resetPasswordDone.getHref());
}