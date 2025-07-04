'use client';

import { contact } from '@/app/(misc)/contact/actions';
import { getFormattedErrorMessage } from '@/lib/parser';
import { paths } from '@/lib/paths';
import { TContact, ZContact } from '@/types/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ContactForm() {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<TContact>({
    resolver: zodResolver(ZContact),
    mode: 'onChange',
  });
  const onSubmit: SubmitHandler<TContact> = async (data) => {
    try {
      const response = await contact(data);
      if (response?.data) {
        router.push(paths.contactDone.getHref());
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4} marginY={4}>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl required>
                <FormLabel htmlFor="email">メールアドレス</FormLabel>
                <TextField {...field} error={!!error} helperText={error?.message} />
              </FormControl>
            )}
          />
          <Controller
            name="content"
            defaultValue=""
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl required>
                <FormLabel htmlFor="content">本文</FormLabel>
                <TextField {...field} multiline rows={4} error={!!error} helperText={error?.message} />
              </FormControl>
            )}
          />

          <Button type="submit" variant="contained" loading={formState.isSubmitting}>
            送信
          </Button>
        </Stack>
      </form>
    </>
  );
}
