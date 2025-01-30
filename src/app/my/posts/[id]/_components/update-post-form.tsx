'use client'
import { Post } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useActionState, useEffect } from 'react';
import { savePost } from '@/app/my/posts/actions';
import { FormItem, FormLabel, FormMessage } from '@/components/form';
import { toast } from 'react-toastify';

type Props = {
  id: string;
  post: Post;
}

export const UpdatePostForm = ({id, post}: Props) => {
  const [state, action, isPending] = useActionState(
    savePost,
    {
      id:id,
      title:post.title,
      content:post.content,
      published: post.published ? 'on' : '',
      message: '',
      errors: {title: '', content: '', published: ''}
    }
  );

  useEffect(() => {
    if(state.message){
      toast(state.message)
    }
  }, [state, state.message]);

  return (
    <form className="grid gap-4" action={action}>
      <div className="py-2">
        <Button loading={isPending}>{isPending ? '保存中...' : '保存'}</Button>
      </div>

      <div className="grid gap-4">
        <FormItem>
          <FormLabel htmlFor="title">タイトル</FormLabel>
          <Input id="title" name="title" defaultValue={state.title} />
          <FormMessage>{state?.errors.title}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel htmlFor="content">本文</FormLabel>
          <Textarea id="content" name="content" defaultValue={state.content} />
          <FormMessage>{state?.errors.content}</FormMessage>
        </FormItem>

        <FormItem>
          <div className="flex items-center space-x-2">
            <FormLabel htmlFor="published">公開</FormLabel>
            <Switch id="published" name="published" defaultChecked={post.published} />
          </div>
          <FormMessage>{state?.errors.published}</FormMessage>
        </FormItem>
      </div>
    </form>
);
};
