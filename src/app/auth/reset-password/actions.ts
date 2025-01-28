'use server';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { paths } from '@/config/paths';

const resetPasswordInputSchema = z
  .object({
    email: z.string().min(1, 'メールアドレスを入力してください。').email('メールアドレスの形式が間違っています。'),
  });

type PrevState = {
  email: string | null;
  errors?: { email?: string; };
}

export async function resetPassword(prevState: PrevState, formData: FormData) {
  const email = formData.get('email') as string;
  const result = resetPasswordInputSchema.safeParse({
    email: email,
  });

  if (!result.success && result.error) {
    const formatted = result.error.format();
    return {
      email: email,
      errors: { email: formatted.email?._errors[0] },
    };
  }
  redirect(paths.auth.resetPasswordDone.getHref());
}