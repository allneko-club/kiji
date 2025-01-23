'use client'
import { UpdatePostInput, updatePostInputSchema, useUpdatePost } from '@/hooks/posts/use-update-post';
import { Post } from '@prisma/client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
  id: string;
  post: Post;
}

export const UpdatePostForm = ({id, post}: Props) => {
  const updatePost = useUpdatePost();
  const form = useForm({ defaultValues: post, resolver: zodResolver(updatePostInputSchema) });

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(
        (data: UpdatePostInput) => updatePost.mutate({id, data})
      )}>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormLabel>Public</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>保存</Button>
      </form>
    </Form>
  );
};
