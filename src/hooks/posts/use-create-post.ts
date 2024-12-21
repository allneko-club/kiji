'use client';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { api } from '@/lib/api-client';
import { Post } from '@/types/api';
import { toast } from 'react-toastify';
import { paths } from '@/config/paths';
import { useRouter } from 'next/navigation';
import { MutationConfig } from '@/lib/react-query';

export const createPostInputSchema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
  public: z.boolean(),
});

export type CreatePostInput = z.infer<typeof createPostInputSchema>;

const createPost = ({data}: {data: CreatePostInput}): Promise<Post> => {
  return api.post(`/posts`, data);
};

type UseCreatePostOptions = {
  mutationConfig?: MutationConfig<typeof createPost>;
};

export const useCreatePost = ({
  mutationConfig,
}: UseCreatePostOptions = {}) => {
  const router = useRouter();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      toast('投稿を追加しました');
      router.replace(`${paths.my.posts.getHref()}`);
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createPost,
  });
};
