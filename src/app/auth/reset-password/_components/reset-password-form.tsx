'use client';

import { resetPassword } from '@/app/auth/reset-password/actions';
import { getFormattedErrorMessage } from '@/lib/parser';
import { paths } from '@/lib/paths';
import { TResetPassword, ZResetPassword } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ResetPasswordForm() {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<TResetPassword>({
    resolver: zodResolver(ZResetPassword),
    mode: 'onChange',
  });
  const onSubmit: SubmitHandler<TResetPassword> = async (data) => {
    try {
      const response = await resetPassword(data);
      if (response?.data) {
        router.push(paths.auth.resetPasswordDone.getHref());
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
    <div>
      <Typography variant="h1">パスワードリセット</Typography>
      <Typography>メールアドレスを入力してください。</Typography>

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

          <Button type="submit" variant="contained" loading={formState.isSubmitting}>
            送信
          </Button>
        </Stack>
      </form>
    </div>
  );
}
