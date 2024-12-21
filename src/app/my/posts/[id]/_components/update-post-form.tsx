'use client'
import { PostForm } from '@/app/my/posts/_components/post-form';
import { UpdatePostInput, updatePostInputSchema, useUpdatePost } from '@/hooks/posts/use-update-post';
import { notFound } from 'next/navigation';
import { usePost } from '@/hooks/posts/post';


export const UpdatePostForm = ({id, userId}: {id: string; userId: string | undefined;}) => {
  const updatePost = useUpdatePost();
  const { data: post} = usePost(id)

  if (!post || post.author.id !== userId) {
    notFound()
  }

  return (
    <PostForm
      onSubmit={(data: UpdatePostInput) => updatePost.mutate({id, data})}
      schema={updatePostInputSchema}
      options={{defaultValues: post}}
    />
  );
};
