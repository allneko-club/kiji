import { ZCuid } from '@/schemas/common';
import { z } from 'zod';

export const ZPost = z.object({
  id: ZCuid.optional(),
  title: z.string({ required_error: 'タイトルを入力してください。' }),
  content: z.string({ required_error: '本文を選択してください。' }).max(5000, '5000文字以下にしてください。'),
  published: z.boolean().default(false),
  categoryId: z
    .number({ required_error: 'カテゴリーを選択してください。' })
    .min(1, 'カテゴリーIDが不正です。'),
  authorId: z.string({ required_error: '投稿者を選択してください。' }),
  tagIds: z.array(z.number()),
});
