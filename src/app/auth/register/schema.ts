import { z } from 'zod';

export const registerInputSchema = z
  .object({
    name: z.string({ required_error: '名前を入力してください。' }),
    email: z
      .string({ required_error: 'メールアドレスを入力してください。' })
      .email('メールアドレスの形式が間違っています。'),
    password: z
      .string({ required_error: 'パスワードは8文字以上の半角英数字で入力してください。' })
      .regex(/^[a-z\d]{8,100}$/i, 'パスワードは8文字以上の半角英数字で入力してください。'),
    passwordConfirm: z.string({ required_error: '確認用のパスワードを入力してください。' }),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        path: ['passwordConfirm'],
        code: 'custom',
        message: 'パスワードが一致しません。',
      });
    }
  });
