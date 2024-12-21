import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { toast } from 'react-toastify';
import { paths } from '@/config/paths';
import { useRouter } from 'next/navigation';

const deletePost = ({id}: { id: string; }) => {
  return api.delete(`/posts/${id}`);
};

export const useDeletePost = () => {
  const router = useRouter();

  return useMutation({
    onSuccess: () => {
      toast('投稿を削除しました');
      router.replace(`${paths.my.posts.getHref()}`)
    },
    mutationFn: deletePost,
  });
};