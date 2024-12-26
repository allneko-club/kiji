import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { paths } from '@/config/paths';

const contactInputSchema = z
  .object({
    email: z.string().min(1, "メールアドレスを入力してください。").email('メールアドレスの形式が間違っています。'),
    content: z.string().min(1, '内容を入力してください。'),
  });

type contactInput = z.infer<typeof contactInputSchema>;

const postContact = (data: contactInput): Promise<Record<string, never>> => {
  return api.post('/contact', data);
};

const useConfirm = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: postContact,
    onSuccess: () => router.push(`${paths.contactDone.getHref()}`),
  });
};

export {contactInputSchema, contactInput, useConfirm}