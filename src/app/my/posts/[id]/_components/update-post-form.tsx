'use client'
import { PostForm } from '@/app/my/posts/_components/post-form';
import { UpdatePostInput, updatePostInputSchema, useUpdatePost } from '@/hooks/posts/use-update-post';
import { Post, User } from '@prisma/client';

type Props = {
  id: string;
  post: Post & { author: User };
}

export const UpdatePostForm = ({id, post}: Props) => {
  const updatePost = useUpdatePost();

  return (
    <PostForm
      onSubmit={(data: UpdatePostInput) => updatePost.mutate({id, data})}
      schema={updatePostInputSchema}
      options={{defaultValues: post}}
    />
  );
};
