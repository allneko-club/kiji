'use server';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { paths } from '@/config/paths';

const contactInputSchema = z
  .object({
    email: z.string().min(1, 'メールアドレスを入力してください。').email('メールアドレスの形式が間違っています。'),
    content: z.string().min(1, '内容を入力してください。'),
  });

type PrevState = {
  errors?: {
    email?: string;
    content?: string;
  };
}

export async function contact(prevState: PrevState, formData: FormData) {
  const email = formData.get('email');
  const content = formData.get('content');

  const result = contactInputSchema.safeParse({
    email: email,
    content: content,
  });
  if (!result.success && result.error) {
    const formatted = result.error.format();
    console.log(formatted);
    return {
      errors: {
        email: formatted.email?._errors[0],
        content: formatted.content?._errors[0],
      },
    };
  }
  redirect(paths.contactDone.getHref());
}