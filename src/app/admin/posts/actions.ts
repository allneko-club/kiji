'use server';
import { redirect } from 'next/navigation';
import { paths } from '@/config/paths';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { getPost } from '@/models/post';
import { createPostInputSchema } from '@/schemas/post';

type PrevState = {
  id: string;
  title: string;
  content: string;
  published: string;
  categoryId: string;
  tagIds: number[];
  message: string;
  errors?: {
    title?: string;
    content?: string;
    published?: string;
    categoryId?: string;
  };
}

export async function savePost(prevState: PrevState, formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(paths.auth.login.getHref());
  }

  const id = prevState.id;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const published = formData.get('published') as string;
  const categoryId = formData.get('categoryId') as string;
  const strTagIds = formData.getAll('tagIds') as string[];
  const tagIds = strTagIds.map(id => Number(id));

  const result = createPostInputSchema.safeParse({
    title: title,
    content: content,
    published: published === 'on',
    categoryId: Number(categoryId),
    tagIds: tagIds,
  });

  if (!result.success && result.error) {
    const formatted = result.error.format();

    return {
      id: id,
      title: title,
      content: content,
      published: published,
      categoryId: categoryId,
      tagIds: tagIds,
      message: '',
      errors: {
        title: formatted.title?._errors[0],
        content: formatted.content?._errors[0],
        published: formatted.published?._errors[0],
        categoryId: formatted.categoryId?._errors[0],
      },
    };
  }

  const saveData = {
    title: result.data?.title,
    content: result.data?.content,
    published: result.data?.published,
    categoryId: result.data?.categoryId,
    tags: {
      // 存在しないタグIDを指定した場合は例外がスローされる
      connect: result.data?.tagIds.map(id => {
        return { id };
      }),
    },
    authorId: session.user.id,
  };

  // todo 作成、更新エラー処理
  if (id) {
    const post = await getPost(id);
    if (!post) {
      redirect(paths.admin.getHref());
    }
    await prisma.$transaction([
      // 現在のタグを全て削除
      prisma.post.update({
        where: { id: id },
        data: {
          tags: {
            deleteMany: {},
          },
        },
      }),
      prisma.post.update({
        where: { id: id },
        data: saveData,
      }),
    ]);
  } else {
    await prisma.post.create({ data: saveData });
  }

  return {
    id: id,
    title: title,
    content: content,
    published: published,
    categoryId: categoryId,
    tagIds: tagIds,
    message: '保存しました。',
    errors: { title: '', content: '', published: '', categoryId: '' },
  };
}

export async function deletePost(prevState: null, formData: FormData) {
  const id = formData.get('id') as string;
  try {
    await prisma.post.delete({ where: { id: id } });
  } catch {
    /* RecordNotFound 例外が発生しても無視する */
  }
  return Promise.resolve(null);
}