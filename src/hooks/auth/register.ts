import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { api } from '@/lib/api-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { paths } from '@/config/paths';
import { User } from '@/types/api/users';

const registerInputSchema = z
  .object({
    name: z.string().min(1, 'ユーザー名を入力してください。'),
    email: z.string().min(1, "メールアドレスを入力してください。").email('メールアドレスの形式が間違っています。'),
    password: z.string().min(8, 'パスワードは8文字以上にしてください。')
      .regex(/^[a-z\d]{8,100}$/i, 'パスワードは半角英数字で入力してください。'),
    passwordConfirm: z.string().min(1, '確認用のパスワードを入力してください。')
  }).superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        path: ['passwordConfirm'],
        code: 'custom',
        message: 'パスワードが一致しません。',
      });
    }
  });

type RegisterInput = z.infer<typeof registerInputSchema>;

const register = (data: RegisterInput): Promise<User> => {
  return api.post('/users', data);
};

const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: register,
    onSuccess:() => {
      toast('アカウントを登録しました');
      router.push(`${paths.auth.login.getHref()}`)
    },
  });
};

export {registerInputSchema, RegisterInput, useRegister}