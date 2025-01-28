'use server';
import { redirect } from 'next/navigation';
import { paths } from '@/config/paths';
import { prisma } from '@/express/prisma';

export async function deletePost(prevState: null, formData: FormData): Promise<null> {
  const id = formData.get('id') as string;
  try{
    await prisma.post.delete({ where: { id: id } });
  } catch {
    /* RecordNotFound 例外が発生しても無視する */
  }
  redirect(paths.my.getHref());
}