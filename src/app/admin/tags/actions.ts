'use server';
import { redirect } from 'next/navigation';
import { paths } from '@/config/paths';
import { Prisma, prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { TagInputSchema } from '@/schemas/tag';
import { parseWithZod } from '@conform-to/zod';


export async function createTag(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(paths.auth.login.getHref());
  }

  const submission = parseWithZod(formData, {
    schema: TagInputSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    await prisma.tag.create({ data: submission.value });

  } catch (e: unknown) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return submission.reply({ formErrors: ['スラッグの値は一意にして下さい。'] });
      }
    }
    console.error('unknown error', e);
  }

  redirect(paths.admin.tags.getHref());
}

export async function updateTag(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(paths.auth.login.getHref());
  }

  const submission = parseWithZod(formData, {
    schema: TagInputSchema,
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

  } catch (e: unknown) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return submission.reply({ formErrors: ['スラッグの値は一意にして下さい。'] });
      }else if (e.code === 'P2025') {
        return submission.reply({ formErrors: ['このタグは既に削除されています。'] });
      }
    }
    console.error('unknown error', e);
  }

  redirect(paths.admin.tags.getHref());
}

export async function deleteTag(prevState: unknown, formData: FormData) {
  const id = Number(formData.get('id') as string);
  try {
    await prisma.tag.delete({ where: { id: id } });
  } catch {
    /* RecordNotFound 例外が発生しても無視する */
  }
  return Promise.resolve(null);
}