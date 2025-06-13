import { z } from 'zod';

export const postInputSchema = z.object({
  id: z.string().optional(),
  title: z.string({ required_error: 'タイトルを入力してください。' }),
  content: z.string({ required_error: '本文を選択してください。' }).max(5000, '5000文字以内にしてください。'),
  published: z.boolean().default(false),
  categoryId: z.number().min(1, 'カテゴリーIDが不正です。').optional(),
  authorId: z.string({ required_error: '投稿者を選択してください。' }),
  tagIds: z.array(z.number()),
});
