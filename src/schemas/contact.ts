import { ZUserEmail } from '@/schemas/user';
import { z } from 'zod';

export const ZContact = z.object({
  email: ZUserEmail,
  content: z.string().min(1, '内容を入力してください。').max(1000, '1000文字以内にしてください。'),
});

export type TContact = z.infer<typeof ZContact>;
