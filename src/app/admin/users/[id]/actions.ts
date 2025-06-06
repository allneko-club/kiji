'use server';
import { redirect } from 'next/navigation';
import { paths } from '@/config/paths';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

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