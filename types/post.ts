import { ZCuid } from '@/types/common';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const ZPost = z.object({
  id: ZCuid.optional(),
  title: z.string().trim().min(1, 'タイトルを入力してください。'),
  content: z.string().max(5000, '5000文字以下にしてください。').optional(),
  excerpt: z.string().max(200, '200文字以下にしてください。').optional(),
  slug: z.string().min(1, 'スラッグを入力してください。').max(200, '200文字以下にしてください。'),
  published: z.boolean(),
  categoryId: z
    .number({ required_error: 'カテゴリーを選択してください。' })
    .min(1, 'カテゴリーIDが不正です。'),
  authorId: z.string().min(1, '投稿者を選択してください。'),
  tagIds: z.array(z.number()),
});

export type TPost = z.infer<typeof ZPost>;

export type PostWithCategoryAuthor = Prisma.PostGetPayload<{
  include: {
    author: true;
    category: true;
  };
}>;
