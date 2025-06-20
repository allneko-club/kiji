import { ZUserEmail } from '@/schemas/user';
import { z } from 'zod';

export const ZContact = z.object({
  email: ZUserEmail,
  content: z
    .string({ required_error: '内容を入力してください。' })
    .max(1000, { message: '1000文字以下の半角英数字で入力してください。' }),
});
