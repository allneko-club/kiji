'use server';

import { paths } from '@/config/paths';
import { ZResetPassword } from '@/schemas/user';
import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'next/navigation';

export async function resetPassword(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: ZResetPassword,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  redirect(paths.auth.resetPasswordDone.getHref());
}
