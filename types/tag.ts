import { ZId } from '@/types/common';
import { z } from 'zod';

export const ZTag = z.object({
  id: ZId.optional(),
  name: z.string().trim().min(1, '名前を入力してください。').max(20, '20文字以内にしてください。'),
  slug: z
    .string()
    .trim()
    .min(1, 'スラッグを入力してください。')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i, '不正なスラッグです。'),
  description: z.string().max(1000, '1000文字以内にしてください。').optional(),
});

export type TTag = z.infer<typeof ZTag>;
