'use client';

import { createTag, updateTag } from '@/app/admin/tags/actions';
import { getFormattedErrorMessage } from '@/lib/parser';
import { paths } from '@/lib/paths';
import { TTag, ZTag } from '@/types/tag';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Tag } from '@prisma/client';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const TagForm = ({ tag }: { tag?: Tag }) => {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<TTag>({
    defaultValues: tag ? tag : {},
    resolver: zodResolver(ZTag),
    mode: 'onChange',
  });
  const onSubmit: SubmitHandler<TTag> = async (data) => {
    try {
      const response = tag ? await updateTag(data) : await createTag(data);
      if (response?.data) {
        toast.success('保存しました');
        router.push(paths.admin.tags.getHref());
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
          name="description"
          defaultValue=""
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl>
              <FormLabel htmlFor="description">説明</FormLabel>
              <TextField {...field} multiline rows={4} error={!!error} helperText={error?.message} />
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
