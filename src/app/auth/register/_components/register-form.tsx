'use client';

import { Card } from '@/app/auth/_components/card';
import { register } from '@/app/auth/register/actions';
import { registerInputSchema } from '@/app/auth/register/schema';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useActionState } from 'react';
import { toast } from 'react-toastify';

export default function RegisterForm() {
  const [lastResult, action, isPending] = useActionState(register, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: registerInputSchema });
    },
  });

  return (
    <Card variant="outlined">
      <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
        ユーザー登録
      </Typography>
      <Typography>以下のフォームに入力してください。</Typography>
      <Box
        id={form.id}
        component="form"
        onSubmit={form.onSubmit}
        action={(formData) => {
          action(formData);
          toast('登録しました');
        }}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}>
        <FormControl required>
          <FormLabel htmlFor={fields.name.name}>ユーザー名</FormLabel>
          <TextField
            id={fields.name.id}
            name={fields.name.name}
            error={!!fields.name.errors}
            helperText={fields.name.errors}
          />
        </FormControl>
        <FormControl required>
          <FormLabel htmlFor={fields.email.name}>メールアドレス</FormLabel>
          <TextField
            id={fields.email.id}
            name={fields.email.name}
            error={!!fields.email.errors}
            helperText={fields.email.errors}
          />
        </FormControl>
        <FormControl required>
          <FormLabel htmlFor={fields.password.name}>パスワード</FormLabel>
          <TextField
            id={fields.password.id}
            type="password"
            name={fields.password.name}
            error={!!fields.password.errors}
            helperText={fields.password.errors}
          />
          <FormHelperText>8文字以上の半角英数字にしてください。</FormHelperText>
        </FormControl>
        <FormControl required>
          <FormLabel htmlFor={fields.passwordConfirm.name}>パスワード（確認）</FormLabel>
          <TextField
            id={fields.passwordConfirm.id}
            type="password"
            name={fields.passwordConfirm.name}
            error={!!fields.passwordConfirm.errors}
            helperText={fields.passwordConfirm.errors}
          />
        </FormControl>

        <Button type="submit" variant="contained" loading={isPending}>
          登録
        </Button>
      </Box>
    </Card>
  );
}
