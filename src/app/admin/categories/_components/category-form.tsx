'use client';

import { createCategory, updateCategory } from '@/app/admin/categories/actions';
import { paths } from '@/config/paths';
import { getFormattedErrorMessage } from '@/lib/utils';
import { TCategory, ZCategory } from '@/schemas/category';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Category } from '@prisma/client';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const CategoryForm = ({ category }: { category?: Category }) => {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<TCategory>({
    defaultValues: category ? category : {},
    resolver: zodResolver(ZCategory),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<TCategory> = async (data) => {
    try {
      const response = category ? await updateCategory(data) : await createCategory(data);
      if (response?.data) {
        toast.success('保存しました');
        router.push(paths.admin.categories.getHref());
      } else {
        console.error('err');
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
        <Controller
          name="name"
          defaultValue=""
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl required>
              <FormLabel htmlFor="name">名前</FormLabel>
              <TextField {...field} error={!!error} helperText={error?.message} />
            </FormControl>
          )}
        />
        <Controller
          name="slug"
          defaultValue=""
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl required>
              <FormLabel htmlFor="slug">スラッグ</FormLabel>
              <TextField {...field} error={!!error} helperText={error?.message} />
            </FormControl>
          )}
        />
        <Controller
          name="image"
          defaultValue=""
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl>
              <FormLabel htmlFor="image">画像URL</FormLabel>
              <TextField {...field} error={!!error} helperText={error?.message} />
            </FormControl>
          )}
        />
        <Controller
          name="description"
          defaultValue=""
          control={control}
          render={({ field, formState: { errors } }) => (
            <FormControl>
              <FormLabel htmlFor="description">説明</FormLabel>
              <TextField
                {...field}
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
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
