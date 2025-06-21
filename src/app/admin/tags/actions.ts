'use server';

import { isAdmin } from '@/app/admin/utils';
import { auth } from '@/auth';
import { paths } from '@/config/paths';
import { DatabaseError } from '@/lib/errors';
import { Prisma, prisma } from '@/lib/prisma';
import { ZTag } from '@/schemas/tag';
import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'next/navigation';

export async function createTag(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!isAdmin(session?.user)) {
    redirect(paths.auth.login.getHref());
  }

  const submission = parseWithZod(formData, {
    schema: ZTag,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    await prisma.tag.create({ data: submission.value });
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

  redirect(paths.admin.tags.getHref());
}

export async function updateTag(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!isAdmin(session?.user)) {
    redirect(paths.auth.login.getHref());
  }

  const submission = parseWithZod(formData, {
    schema: ZTag,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    const id = Number(formData.get('id') as string);

    await prisma.tag.update({
      where: { id: id },
      data: submission.value,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return submission.reply({ formErrors: ['スラッグの値は一意にして下さい。'] });
      } else if (e.code === 'P2025') {
        return submission.reply({ formErrors: ['このタグは既に削除されています。'] });
      } else {
        throw new DatabaseError(e.message);
      }
    }
    throw e;
  }

  redirect(paths.admin.tags.getHref());
}

export async function deleteTag(prevState: unknown, formData: FormData) {
  const id = Number(formData.get('id') as string);
  const session = await auth();

  if (!isAdmin(session?.user)) {
    redirect(paths.auth.login.getHref());
  }

  try {
    await prisma.tag.delete({ where: { id: id } });
  } catch {
    /* RecordNotFound 例外が発生しても無視する */
  }
  return Promise.resolve(null);
}
