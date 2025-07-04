'use client';

import { Card } from '@/app/auth/_components/card';
import { register } from '@/app/auth/register/actions';
import { getFormattedErrorMessage } from '@/lib/parser';
import { paths } from '@/lib/paths';
import { TRegister, ZRegister } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function RegisterForm() {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<TRegister>({
    resolver: zodResolver(ZRegister),
    mode: 'onChange',
  });
  const onSubmit: SubmitHandler<TRegister> = async (data) => {
    try {
      const response = await register(data);
      if (response?.data) {
        toast.success('登録しました');
        router.push(paths.auth.login.getHref());
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
    <Card variant="outlined">
      <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
        ユーザー登録
      </Typography>
      <Typography>以下のフォームに入力してください。</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}>
        <Controller
          name="name"
          defaultValue=""
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl required>
              <FormLabel htmlFor="name">ユーザー名</FormLabel>
              <TextField {...field} error={!!error} helperText={error?.message} />
            </FormControl>
          )}
        />
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
          name="password"
          defaultValue=""
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl required>
              <FormLabel htmlFor="password">パスワード</FormLabel>
              <TextField {...field} error={!!error} helperText={error?.message} type="password" />
              <FormHelperText>8文字以上の半角英数字にしてください。</FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="passwordConfirm"
          defaultValue=""
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl required>
              <FormLabel htmlFor="passwordConfirm">パスワード（確認）</FormLabel>
              <TextField {...field} error={!!error} helperText={error?.message} type="password" />
            </FormControl>
          )}
        />

        <Button type="submit" variant="contained" loading={formState.isSubmitting}>
          登録
        </Button>
      </Box>
    </Card>
  );
}
