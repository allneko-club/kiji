import { z } from 'zod';

export const ZCategory = z.object({
  id: z.number().optional(),
  name: z.string({ required_error: '名前を入力してください。' }).max(20, '20文字以内にしてください。'),
  slug: z
    .string({ required_error: 'スラッグを入力してください。' })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i, '不正なスラッグです。'),
  description: z.string().max(1000, '1000文字以内にしてください。').default(''),
  image: z.string().url('URLの形式が間違っています。').optional(),
});

export const ZDeleteCategory = z.object({
  id: z.number().min(1),
});
