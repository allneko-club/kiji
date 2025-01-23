import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm, UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdatePostInput, updatePostInputSchema } from '@/hooks/posts/use-update-post';

// todo 追加フォームと更新フォームを共通化したいが、型の定義方法が難解
// type Props<TFormValues extends FieldValues, Schema> = {
//   onSubmit: SubmitHandler<TFormValues>;
//   options?: UseFormProps<TFormValues>;
//   schema: Schema;
// };

// export const PostForm =  <
//   Schema extends z.ZodObject<any>,
//   TFormValues extends FieldValues = z.infer<Schema>,
// >({onSubmit, options, schema}: Props<TFormValues, Schema>) => {

type Props = {
  onSubmit: SubmitHandler<UpdatePostInput>;
  options?: UseFormProps<UpdatePostInput>;
  schema: typeof updatePostInputSchema ;
};

export const PostForm = ({onSubmit, options, schema}: Props) => {

  const form = useForm<UpdatePostInput>({ ...options, resolver: zodResolver(schema) });
  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>

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