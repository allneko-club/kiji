'use server';

import { auth } from '@/auth';
import { paths } from '@/config/paths';
import { DatabaseError } from '@/lib/errors';
import { Prisma, prisma } from '@/lib/prisma';
import { getPost } from '@/models/post';
import { ZPost } from '@/schemas/post';
import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'next/navigation';

export async function createPost(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(paths.auth.login.getHref());
  }

  const submission = parseWithZod(formData, {
    schema: ZPost,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const saveData = {
    title: submission.value.title,
    content: submission.value.content,
    published: submission.value.published,
    categoryId: submission.value.categoryId,
    tags: {
      connect: submission.value.tagIds.map((id) => {
        return { id };
      }),
    },
    authorId: submission.value.authorId,
  };

  try {
    await prisma.post.create({ data: saveData });
  } catch (e) {
    // todo エラー処理 存在しないタグIDを指定した場合は例外がスローされる
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new DatabaseError(e.message);
    }
    throw e;
  }

  redirect(paths.admin.posts.getHref());
}

export async function updatePost(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(paths.auth.login.getHref());
  }

  const submission = parseWithZod(formData, {
    schema: ZPost,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const saveData = {
    title: submission.value.title,
    content: submission.value.content,
    published: submission.value.published,
    categoryId: submission.value.categoryId,
    authorId: submission.value.authorId,
    tags: {
      // 存在しないタグIDを指定した場合は例外がスローされる
      set: submission.value.tagIds.map((id) => {
        return { id };
      }),
    },
  };

  const id = submission.value.id || '';
  const post = await getPost(id);
  if (!post) {
    redirect(paths.admin.getHref());
  }
  try {
    await prisma.$transaction([
      prisma.post.update({
        where: { id: id },
        data: saveData,
      }),
    ]);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new DatabaseError(e.message);
    }
    throw e;
  }

  redirect(paths.admin.posts.getHref());
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
