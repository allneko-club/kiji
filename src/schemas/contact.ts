import { z } from 'zod';

export const contactInputSchema = z.object({
  email: z
    .string({ required_error: 'メールアドレスを入力してください。' })
    .email('メールアドレスの形式が間違っています。'),
  content: z.string({ required_error: '内容を入力してください。' }),
});
