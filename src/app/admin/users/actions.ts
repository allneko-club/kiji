'use server';

import { isAdmin } from '@/app/admin/utils';
import { auth } from '@/auth';
import { paths } from '@/config/paths';
import { DatabaseError } from '@/lib/errors';
import { Prisma, prisma } from '@/lib/prisma';
import { ZUpdateUser } from '@/schemas/user';
import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'next/navigation';

export async function updateUser(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!isAdmin(session?.user)) {
    redirect(paths.auth.login.getHref());
  }

  const submission = parseWithZod(formData, {
    schema: ZUpdateUser,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    const role = Number(submission.value.role);

    await prisma.user.update({
      where: { id: submission.value.id },
      data: { ...submission.value, role: role },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return submission.reply({ formErrors: ['このメールアドレスは使用されています。'] });
      } else if (e.code === 'P2025') {
        return submission.reply({ formErrors: ['このユーザーは既に削除されています。'] });
      } else {
        throw new DatabaseError(e.message);
      }
    }
    throw e;
  }

  redirect(paths.admin.users.getHref());
}

export async function deleteUser(prevState: null, formData: FormData) {
  const id = formData.get('id') as string;
  const session = await auth();

  if (!isAdmin(session?.user)) {
    redirect(paths.auth.login.getHref());
  }

  try {
    await prisma.user.delete({ where: { id: id } });
  } catch {
    /* RecordNotFound 例外が発生しても無視する */
  }

  return Promise.resolve(null);
}
