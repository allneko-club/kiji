import { z } from 'zod';
import { RoleFilterValues } from '@/config/consts';


export const updateUserInputSchema = z
  .object({
    id: z.string(),
    name: z.string({ required_error: '名前を入力してください。' }),
    email: z.string({ required_error: 'メールアドレスを入力してください。' }).email('メールアドレスの形式が間違っています。'),
    image: z.string().url('URLの形式が間違っています。').optional(),
    password: z.string({ required_error: 'パスワードは8文字以上の半角英数字で入力してください。' })
      .regex(/^[a-z\d]{8,100}$/i, 'パスワードは8文字以上の半角英数字で入力してください。')
      .optional(),
    role: z.enum(RoleFilterValues),
  });