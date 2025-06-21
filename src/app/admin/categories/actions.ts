'use server';

import { isAdmin } from '@/app/admin/utils';
import { auth } from '@/auth';
import { paths } from '@/config/paths';
import { DEFAULT_CATEGORY_ID } from '@/lib/consts';
import { DatabaseError } from '@/lib/errors';
import { Prisma, prisma } from '@/lib/prisma';
import { ZCategory, ZDeleteCategory } from '@/schemas/category';
import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'next/navigation';

export async function createCategory(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!isAdmin(session?.user)) {
    redirect(paths.auth.login.getHref());
  }

  const submission = parseWithZod(formData, {
    schema: ZCategory,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    await prisma.category.create({ data: submission.value });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return submission.reply({ formErrors: ['スラッグの値は一意にして下さい。'] });
      } else {
        throw new DatabaseError(e.message);
      }
    }
    throw e;
  }

  redirect(paths.admin.categories.getHref());
}

export async function updateCategory(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!isAdmin(session?.user)) {
    redirect(paths.auth.login.getHref());
  }

  const submission = parseWithZod(formData, {
    schema: ZCategory,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    const id = Number(formData.get('id') as string);

    await prisma.category.update({
      where: { id: id },
      data: submission.value,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return submission.reply({ formErrors: ['スラッグの値は一意にして下さい。'] });
      } else if (e.code === 'P2025') {
        return submission.reply({ formErrors: ['このカテゴリーは既に削除されています。'] });
      } else {
        throw new DatabaseError(e.message);
      }
    }
    throw e;
  }

  redirect(paths.admin.categories.getHref());
}

export async function deleteCategory(prevState: unknown, formData: FormData) {
  const id = Number(formData.get('id') as string);
  const session = await auth();

  if (!isAdmin(session?.user)) {
    redirect(paths.auth.login.getHref());
  }

  const submission = parseWithZod(formData, {
    schema: ZDeleteCategory,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  } else if (submission.value.id === DEFAULT_CATEGORY_ID) {
    // todo 動的にスキーマを作った方が良いかも
    return submission.reply({ formErrors: ['デフォルトのカテゴリーは削除できません。'] });
  }

  try {
    await prisma.$transaction([
      prisma.post.updateMany({ where: { categoryId: id }, data: { categoryId: DEFAULT_CATEGORY_ID } }),
      prisma.category.delete({ where: { id: id } }),
    ]);
  } catch {
    /* RecordNotFound 例外が発生しても無視する */
  }
  return Promise.resolve({ status: 'success' });
}
