import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { paths } from '@/config/paths';

const resetPasswordInputSchema = z
  .object({
    email: z.string().min(1, "メールアドレスを入力してください。").email('メールアドレスの形式が間違っています。'),
  });

type resetPasswordInput = z.infer<typeof resetPasswordInputSchema>;

const postResetPassword = (data: resetPasswordInput): Promise<Record<string, never>> => {
  return api.post('/auth/reset-password', data);
};

const useResetPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: postResetPassword,
    onSuccess: () => router.replace(`${paths.auth.resetPasswordDone.getHref()}`),
  });
};

export {resetPasswordInputSchema, resetPasswordInput, useResetPassword}