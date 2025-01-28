'use server';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { paths } from '@/config/paths';

const createPostInputSchema = z.object({
  title: z.string().min(1, 'Required'),
  content: z.string().min(1, 'Required'),
  published: z.boolean(),
});

type PrevState = {
  title: string | null;
  content: string | null;
  published: string | null;
  errors?: {
    title?: string;
    content?: string;
    published?: string;
  };
}

export async function createPost(prevState: PrevState, formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const published = formData.get('published') as string;
  const result = createPostInputSchema.safeParse({
    title: title,
    content: content,
    published: published,
  });

  if (!result.success && result.error) {
    const formatted = result.error.format();

    // 入力エラーがある場合はパスワードを再入力させるために空欄にする
    return {
      title: title,
      content: content,
      published: published,
      errors: {
        title: formatted.title?._errors[0],
        content: formatted.content?._errors[0],
        published: formatted.published?._errors[0],
      },
    };
  }
  // todo toast('アカウントを登録しました')の表示方法
  redirect(paths.auth.login.getHref());
}