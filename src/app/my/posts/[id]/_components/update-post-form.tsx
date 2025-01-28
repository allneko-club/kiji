'use client'
import { Post } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useActionState } from 'react';
import { savePost } from '@/app/my/posts/actions';
import { Label } from '@/components/ui/label';
import { FormItem, FormMessage } from '@/components/form';

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
      errors: {title: '', content: '', published: ''}
    }
  );

  return (
    <form className="grid gap-4" action={action}>
      <FormItem>
        <Label htmlFor="title">タイトル</Label>
        <Input id="title" name="title" defaultValue={state.title} />
        <FormMessage>{state?.errors.title}</FormMessage>
      </FormItem>

      <FormItem>
        <Label htmlFor="content">本文</Label>
        <Textarea id="content" name="content" defaultValue={state.content} />
        <FormMessage>{state?.errors.content}</FormMessage>
      </FormItem>

      <FormItem>
        <div className="flex items-center space-x-2">
          <Label htmlFor="published">公開</Label>
          <Switch id="published" name="published" defaultChecked={post.published} />
        </div>
        <FormMessage>{state?.errors.published}</FormMessage>
      </FormItem>

      <Button type="submit" loading={isPending}>保存</Button>
    </form>
  );
};
