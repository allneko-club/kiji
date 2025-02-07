import { z } from 'zod';

export const createPostInputSchema = z.object({
  title: z.string({ required_error: 'タイトルを入力してください。' }),
  content: z.string().max(5000, '5000文字以内にしてください。'),
  published: z.boolean(),
  categoryId: z.number().min(1, 'カテゴリーIDが不正です。'),
  tagIds: z.array(z.number()),
});