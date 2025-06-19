import { z } from 'zod';

export const resetPasswordInputSchema = z.object({
  email: z
    .string({ required_error: 'メールアドレスを入力してください。' })
    .email('メールアドレスの形式が間違っています。'),
});
