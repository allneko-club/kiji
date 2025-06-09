'use server';
import { redirect } from 'next/navigation';
import { paths } from '@/config/paths';
import { Prisma, prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { parseWithZod } from '@conform-to/zod';
import { updateUserInputSchema } from '@/app/admin/users/schema';


export async function updateUser(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(paths.auth.login.getHref());
  }

  const submission = parseWithZod(formData, {
    schema: updateUserInputSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    const role = Number(submission.value.role);

    await prisma.user.update({
      where: { id: submission.value.id },
      data: {...submission.value, role: role},
    });

  } catch (e: unknown) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return submission.reply({ formErrors: ['このメールアドレスは使用されています。'] });
      }else if (e.code === 'P2025') {
        return submission.reply({ formErrors: ['このユーザーは既に削除されています。'] });
      }
    }
    console.error('unknown error', e);
  }

  redirect(paths.admin.users.getHref());
}

export async function deleteUser(prevState: null, formData: FormData) {
  const id = formData.get('id') as string;
  const session = await auth();

  if (!session?.user?.email) {
    redirect(paths.auth.login.getHref());
  }

  try {
    await prisma.user.delete({ where: { id: id } });
  } catch {
    /* RecordNotFound 例外が発生しても無視する */
  }

  return Promise.resolve(null);
}