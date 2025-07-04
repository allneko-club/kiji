import { ZId } from '@/types/common';
import { z } from 'zod';

export const ZCategory = z.object({
  id: ZId.optional(),
  name: z.string().trim().min(1, '名前を入力してください。').max(20, '20文字以内にしてください。'),
  slug: z
    .string()
    .trim()
    .min(1, 'スラッグを入力してください。')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i, '不正なスラッグです。'),
  description: z.string().max(1000, '1000文字以内にしてください。').optional(),
  image: z.string().url('URLの形式が間違っています。').or(z.string().length(0)).optional(),
});

export type TCategory = z.infer<typeof ZCategory>;
