'use client';

import { createPost, updatePost } from '@/app/admin/posts/actions';
import { paths } from '@/config/paths';
import { env } from '@/lib/env';
import { getFormattedErrorMessage } from '@/lib/utils';
import { TPost, ZPost } from '@/schemas/post';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { Category, Post, Tag, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
  categories: Category[];
  tags: Tag[];
  users: User[];
  post?: Post & {
    tagIds: number[];
  };
};

export const PostForm = ({ categories, tags, users, post }: Props) => {
  const router = useRouter();
  const { control, handleSubmit, formState, setValue, watch } = useForm<TPost>({
    defaultValues: post ? post : {},
    resolver: zodResolver(ZPost),
    mode: 'onChange',
  });
  const watchTagIds = watch('tagIds');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetId = Number(event.target.value);
    if (event.target.checked) {
      setValue('tagIds', [...watchTagIds, targetId]);
    } else {
      setValue(
        'tagIds',
        watchTagIds.filter((id) => id !== targetId),
      );
    }
  };
  const onSubmit: SubmitHandler<TPost> = async (data) => {
    try {
      const response = post ? await updatePost(data) : await createPost(data);
      if (response?.data) {
        toast.success('保存しました');
        router.push(paths.admin.posts.getHref());
      } else {
        const errorMessage = getFormattedErrorMessage(response);
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error(err);
      toast.error('エラーが発生しました');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} marginY={4}>
        <FormControl required>
          <FormLabel htmlFor="title">タイトル</FormLabel>
          <Controller
            name="title"
            defaultValue=""
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField {...field} error={!!error} helperText={error?.message} />
            )}
          />
        </FormControl>
        <Controller
          name="content"
          defaultValue=""
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl>
              <FormLabel htmlFor="content">本文</FormLabel>
              <TextField {...field} multiline rows={4} error={!!error} helperText={error?.message} />
            </FormControl>
          )}
        />
        <Controller
          name="excerpt"
          defaultValue=""
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl>
              <FormLabel htmlFor="excerpt">メタディスクリプション</FormLabel>
              <TextField {...field} multiline rows={2} error={!!error} helperText={error?.message} />
            </FormControl>
          )}
        />
        <Controller
          name="published"
          defaultValue={false}
          control={control}
          render={({ field }) => (
            <FormControl required>
              <FormLabel htmlFor="published">公開</FormLabel>
              <Switch checked={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />
        <Controller
          name="authorId"
          defaultValue=""
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl error={!!error}>
              <FormLabel htmlFor="authorId">投稿者</FormLabel>
              <Select {...field}>
                {users.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="categoryId"
          defaultValue={env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl required error={!!error}>
              <FormLabel htmlFor="categoryId">カテゴリー</FormLabel>
              <Select {...field}>
                {categories.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="tagIds"
          defaultValue={[]}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl error={!!error}>
              <FormLabel htmlFor="tagIds">タグ</FormLabel>
              <Stack spacing={2} direction="row">
                {tags.map((tag, index) => (
                  <div key={tag.id}>
                    <FormLabel>{tag.name}</FormLabel>
                    <Checkbox
                      name={`tagIds.${index}`}
                      value={tag.id}
                      checked={field.value.includes(tag.id)}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </Stack>
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Stack>

      <Button type="submit" variant="contained" loading={formState.isSubmitting}>
        保存
      </Button>
    </form>
  );
};
