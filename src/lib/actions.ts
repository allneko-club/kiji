'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
          return 'メールアドレスまたはパスワードが間違っています。';
      }else {
            return 'Something went wrong.';
      }
    }
    throw error;
  }
}