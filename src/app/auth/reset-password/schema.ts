import { z } from 'zod';


export const resetPasswordInputSchema = z
  .object({
      email: z.string().min(1, "メールアドレスを入力してください。").email('メールアドレスの形式が間違っています。'),
  });
