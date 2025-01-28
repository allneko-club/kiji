'use server';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { paths } from '@/config/paths';

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

type PrevState = {
  name: string | null;
  email: string | null;
  password: string | null;
  passwordConfirm: string | null;
  errors?: {
    name?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
  };
}

export async function register(prevState: PrevState, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const passwordConfirm = formData.get('passwordConfirm') as string;
  const result = registerInputSchema.safeParse({
    name: name,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
  });

  if (!result.success && result.error) {
    const formatted = result.error.format();

    // 入力エラーがある場合はパスワードを再入力させるために空欄にする
    return {
      name: name,
      email: email,
      password: '',
      passwordConfirm: '',
      errors: {
        name: formatted.name?._errors[0],
        email: formatted.email?._errors[0],
        password: formatted.password?._errors[0],
        passwordConfirm: formatted.passwordConfirm?._errors[0],
      },
    };
  }
  // todo toast('アカウントを登録しました')の表示方法
  redirect(paths.auth.login.getHref());
}