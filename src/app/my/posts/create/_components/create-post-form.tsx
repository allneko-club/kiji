'use client'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useActionState, useEffect } from 'react';
import { savePost } from '@/app/my/posts/actions';
import { FormItem, FormLabel, FormMessage } from '@/components/form';
import { toast } from 'react-toastify';

export const CreatePostForm = () => {
  const [state, action, isPending] = useActionState(
    savePost,
    {
      id:'',
      title:'',
      content:'',
      published: '',
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
          <Switch id="published" name="published" />
        </div>
          <FormMessage>{state?.errors.published}</FormMessage>
      </FormItem>

      <Button loading={isPending}>保存</Button>
    </form>
  );
};
