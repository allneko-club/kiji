'use client'
import { PostForm } from '@/app/my/posts/_components/post-form';
import { Post } from '@/types/api';
import { CreatePostInput, createPostInputSchema, useCreatePost } from '@/hooks/posts/use-create-post';


export const CreatePostForm = () => {
  const defaultValues = { title: "", body: "", public: false } as Post
  const createPost = useCreatePost();

  return (
    <PostForm
      onSubmit={(data: CreatePostInput) => createPost.mutate({data})}
      schema={createPostInputSchema}
      options={{ defaultValues: defaultValues }}
    />
  );
};
