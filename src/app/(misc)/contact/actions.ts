'use server';

import { paths } from '@/config/paths';
import { ZContact } from '@/schemas/contact';
import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'next/navigation';

export async function contact(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: ZContact,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  redirect(paths.contactDone.getHref());
}
