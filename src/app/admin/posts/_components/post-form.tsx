'use client';
import { Category, Tag, User } from '@prisma/client';
import * as React from 'react';
import { useActionState } from 'react';
import { createPost, updatePost } from '@/app/admin/posts/actions';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import { FormProvider, getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { UsePreventFormReset } from '@/hooks/use-prevent-form-reset';
import { postInputSchema } from '@/schemas/post';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { SelectCategory } from '@/app/admin/posts/select-category';
import { SelectUser } from '@/app/admin/posts/select-user';

type Props = {
  categories: Category[];
  tags: Tag[];
  users: User[];
  post?: {
    id: string,
    title: string,
    content: string,
    published: boolean,
    authorId: string,
    categoryId: number | null,
    tagIds: number[],
  };
}

export const PostForm = ({ categories, tags, users, post }: Props) => {
  const [lastResult, submitAction, isPending] = useActionState(
    post ? updatePost : createPost,
    undefined
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postInputSchema });
    },
    defaultValue: post,
  });

  UsePreventFormReset({formId: form.id});

  return (
    <FormProvider context={form.context}>
      <form action={submitAction} {...getFormProps(form)}>
        {form.errors && <Alert severity="error">{form.errors}</Alert>}

        <Stack spacing={4} marginY={4}>
          <input {...getInputProps(fields.id, { type: 'text' })} hidden />
          <FormControl required>
            <FormLabel htmlFor={fields.title.name}>タイトル</FormLabel>
            <TextField
              {...getInputProps(fields.title, { type: 'text' })}
              error={!fields.title.valid}
              helperText={fields.title.errors}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor={fields.content.name}>本文</FormLabel>
            <TextField
              {...getInputProps(fields.content, { type: 'text' })}
              multiline
              rows={10}
              error={!fields.content.valid}
              helperText={fields.content.errors}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor={fields.published.name}>公開</FormLabel>
            <Switch
              {...getInputProps(fields.published, { type: 'checkbox' })}
              defaultChecked={fields.published.initialValue === 'on'}
            />
          </FormControl>

          <FormControl required error={!fields.authorId.valid}>
            <SelectUser
              label="投稿者"
              name={fields.authorId.name}
              required={false}
              users={users}
            />
          </FormControl>

          <FormControl error={!fields.categoryId.valid}>
            <SelectCategory
              label="カテゴリー"
              name={fields.categoryId.name}
              required={false}
              categories={categories}
            />
          </FormControl>


          <FormControl>
            <FormLabel htmlFor={fields.tagIds.name}>タグ</FormLabel>
            <Stack spacing={2} direction="row">
              {tags.map(tag => (
                <div key={tag.id}>
                  <FormLabel>{tag.name}</FormLabel>
                  <Checkbox
                    name="tagIds"
                    value={tag.id}
                  />
                </div>
              ))}
            </Stack>
          </FormControl>
        </Stack>

        <Button type="submit" variant="contained" loading={isPending}>保存</Button>

      </form>
    </FormProvider>
  );
};
