import { z } from 'zod';

export const contactInputSchema = z
  .object({
    email: z.string().min(1, 'メールアドレスを入力してください。').email('メールアドレスの形式が間違っています。'),
    content: z.string().min(1, '内容を入力してください。'),
  });
