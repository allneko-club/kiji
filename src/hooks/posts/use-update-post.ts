'use client';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { api } from '@/lib/api-client';
import { toast } from 'react-toastify';
import { paths } from '@/config/paths';
import { useRouter } from 'next/navigation';
import { MutationConfig } from '@/lib/react-query';
import { Post } from '@/types/api/posts';

export const updatePostInputSchema = z.object({
  id: z.string().min(1, 'Required'),
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
  public: z.boolean(),
});

export type UpdatePostInput = z.infer<typeof updatePostInputSchema>;

const updatePost = ({id, data}: {id:string, data: UpdatePostInput}): Promise<Post> => {
  return api.patch(`/posts/${id}`, data);
};

type UseUpdatePostOptions = {
  mutationConfig?: MutationConfig<typeof updatePost>;
};

export const useUpdatePost = ({
  mutationConfig,
}: UseUpdatePostOptions = {}) => {
  const router = useRouter();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      toast('投稿を更新しました');
      router.push(`${paths.my.posts.getHref()}`)
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updatePost,
  });
};