import { RoleFilterValues } from '@/lib/users';
import { ZCuid } from '@/schemas/common';
import { z } from 'zod';

export const ZUserName = z.string({ required_error: '名前を入力してください。' }).trim();

export const ZUserEmail = z
  .string({ required_error: 'メールアドレスを入力してください。' })
  .max(255)
  .email({ message: 'メールアドレスの形式が間違っています。' });

export const ZUserPassword = z
  .string({ required_error: 'パスワードは8文字以上の半角英数字で入力してください。' })
  .min(8)
  .max(128, { message: '128文字以下の半角英数字で入力してください。' })
  .regex(/^[a-zA-Z\d].*$/);

export const ZUserRole = z.enum(RoleFilterValues);

export const ZUpdateUser = z.object({
  id: ZCuid,
  name: ZUserName,
  email: ZUserEmail,
  image: z.string().url('URLの形式が間違っています。').optional(),
  password: ZUserPassword.optional(),
  role: ZUserRole,
});

export const ZRegister = z
  .object({
    name: ZUserName,
    email: ZUserEmail,
    password: ZUserPassword,
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
export const ZResetPassword = z.object({
  email: ZUserEmail,
});
