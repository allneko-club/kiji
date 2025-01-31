'use client';
import { Category } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useActionState, useEffect } from 'react';
import { savePost } from '@/app/my/posts/actions';
import { FormItem, FormLabel, FormMessage } from '@/components/form';
import { toast } from 'react-toastify';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  initialState: {
    id: string;
    title: string;
    content: string;
    published: string;
    categoryId: string;
  };
  categories: Category[];
}

export const PostForm = ({ initialState, categories }: Props) => {
  const [state, action, isPending] = useActionState(
    savePost,
    {
      ...initialState,
      message: '',
      errors: { title: '', content: '', published: '', categoryId: '' },
    }
  );

  useEffect(() => {
    if (state.message) {
      toast(state.message);
    }
  }, [state, state.message]);

  return (
    <form action={action}>
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
            <Switch id="published" name="published" />
          </div>
          <FormMessage>{state?.errors.published}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel htmlFor="categoryId">カテゴリー</FormLabel>
          <Select name="categoryId" defaultValue={state.categoryId}>
            <SelectTrigger id="categoryId" aria-label="categoryId">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((item) => (
                  <SelectItem key={item.id} value={item.id.toString()}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage>{state?.errors?.categoryId}</FormMessage>
        </FormItem>
      </div>
    </form>
  );
};
