'use server';
import { redirect } from 'next/navigation';
import { paths } from '@/config/paths';
import { Prisma, prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { createCategoryInputSchema, editCategoryInputSchema } from '@/app/admin/categories/schema';
import { parseWithZod } from '@conform-to/zod';


export async function createCategory(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(paths.auth.login.getHref());
  }

  const submission = parseWithZod(formData, {
    schema: createCategoryInputSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    await prisma.category.create({ data: submission.value });

  } catch (e: unknown) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return submission.reply({ formErrors: ['スラッグの値は一意にして下さい。'] });
      }
    }
    console.error('unknown error', e);
  }

  redirect(paths.admin.categories.getHref());
}

export async function updateCategory(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(paths.auth.login.getHref());
  }

  const submission = parseWithZod(formData, {
    schema: editCategoryInputSchema,
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

  } catch (e: unknown) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return submission.reply({ formErrors: ['スラッグの値は一意にして下さい。'] });
      }
    }
    console.error('unknown error', e);
  }

  redirect(paths.admin.categories.getHref());
}

export async function deleteCategory(prevState: unknown, formData: FormData) {
  const id = Number(formData.get('id') as string);
  try {
    await prisma.category.delete({ where: { id: id } });
  } catch {
    /* RecordNotFound 例外が発生しても無視する */
  }
  return Promise.resolve(null);
}