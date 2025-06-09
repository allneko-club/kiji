'use server';
import { redirect } from 'next/navigation';
import { paths } from '@/config/paths';
import { parseWithZod } from '@conform-to/zod';
import { contactInputSchema } from '@/schemas/contact';

export async function contact(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: contactInputSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  redirect(paths.contactDone.getHref());
}