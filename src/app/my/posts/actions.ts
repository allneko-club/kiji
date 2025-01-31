'use server';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { paths } from '@/config/paths';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { getPost } from '@/models/post';

const createPostInputSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください。'),
  content: z.string().max(5000, '5000文字以内にしてください。'),
  published: z.boolean(),
  categoryId: z.number().min(1, 'カテゴリーIDが不正です。'),
});

type PrevState = {
  id: string;
  title: string;
  content: string;
  published: string;
  categoryId: string;
  message: string;
  errors?: {
    title?: string;
    content?: string;
    published?: string;
    categoryId?: string;
  };
}

export async function savePost(prevState: PrevState, formData: FormData) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect(paths.auth.login.getHref());
  }

  const id = prevState.id;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const published = formData.get('published') as string;
  const categoryId = formData.get('categoryId') as string;
  console.log("categoryId", formData)
  const result = createPostInputSchema.safeParse({
    title: title,
    content: content,
    published: published === "on",
    categoryId: Number(categoryId),
  });

  if (!result.success && result.error) {
    const formatted = result.error.format();

    return {
      id: id,
      title: title,
      content: content,
      published: published,
      categoryId: categoryId,
      message: '',
      errors: {
        title: formatted.title?._errors[0],
        content: formatted.content?._errors[0],
        published: formatted.published?._errors[0],
        categoryId: formatted.categoryId?._errors[0],
      },
    };
  }

  if(id){
    const post = await getPost(id);
    if(!post){
      redirect(paths.my.getHref());
    }

    await prisma.post.update({
      where: { id: id },
      data: { ...result.data, authorId: post.authorId } }
    );
  }else{
    // todo 作成エラー処理
    await prisma.post.create({ data: { ...result.data, authorId: session.user.id } });
  }

  return {
    id: id,
    title: title,
    content: content,
    published: published,
    categoryId: categoryId,
    message: '保存しました。',
    errors: {title: '', content: '', published: '', categoryId: ''}
  }
}

export async function deletePost(prevState: null, formData: FormData) {
  const id = formData.get('id') as string;
  try {
    await prisma.post.delete({ where: { id: id } });
  } catch {
    /* RecordNotFound 例外が発生しても無視する */
  }
  return Promise.resolve(null)
}