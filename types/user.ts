import { ZCuid } from '@/types/common';
import { z } from 'zod';

export const ZUserName = z
  .string()
  .trim()
  .min(1, '名前を入力してください。')
  .max(20, '20文字以内にしてください。');

export const ZUserEmail = z
  .string()
  .trim()
  .min(1, 'メールアドレスを入力してください。')
  .max(255)
  .email({ message: 'メールアドレスの形式が間違っています。' });

export const ZUserPassword = z
  .string()
  .min(8, 'パスワードは8文字以上の半角英数字で入力してください。')
  .max(128, { message: '128文字以下の半角英数字で入力してください。' })
  .regex(/^[a-zA-Z\d].*$/);

export const ZUpdateUser = z.object({
  id: ZCuid,
  name: ZUserName,
  email: ZUserEmail,
  image: z.string().url('URLの形式が間違っています。').or(z.string().length(0)).optional(),
  password: ZUserPassword.optional(),
  // todo Roleはリテラル型の方にしようとしたがuseForm()での扱いが難しい
  role: z.number().min(0),
});

export type TUpdateUser = z.infer<typeof ZUpdateUser>;

export const ZRegister = z
  .object({
    name: ZUserName,
    email: ZUserEmail,
    password: ZUserPassword,
    passwordConfirm: z.string().min(1, '確認用のパスワードを入力してください。'),
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

export type TRegister = z.infer<typeof ZRegister>;

export const ZResetPassword = z.object({
  email: ZUserEmail,
});

export type TResetPassword = z.infer<typeof ZResetPassword>;
