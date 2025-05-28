"use client"
import { useActionState } from 'react';
import { register } from '@/app/auth/register/actions';
import { FormItem, FormMessage } from '@/components/form';
import { useForm } from '@conform-to/react';
import { registerInputSchema } from '@/app/auth/register/schema';
import { parseWithZod } from '@conform-to/zod';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Alert, Card } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        ユーザー登録
      </Typography>
      <Typography>以下のフォームに入力してください。</Typography>
      {form.errors && <Alert severity="error">{form.errors}</Alert>}
      <Box
        id={form.id}
        component="form"
        onSubmit={form.onSubmit}
        action={formData => {
          action(formData);
          toast('登録しました');
        }}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <FormMessage>{form.errors}</FormMessage>
        <FormItem>
          <TextField
            id="name"
            required
            label="ユーザー名"
            variant="outlined"
            name={fields.name.name}
          />
          <FormMessage>{fields.name.errors}</FormMessage>
        </FormItem>

        <FormItem>
          <TextField
            id="email"
            required
            label="メールアドレス"
            variant="outlined"
            name={fields.email.name}
          />
          <FormMessage>{fields.email.errors}</FormMessage>
        </FormItem>

        <FormItem>
          <TextField
            id="password"
            required
            type="password"
            label="パスワード"
            variant="outlined"
            name={fields.password.name}
          />
          <div>8文字以上の半角英数字にしてください。</div>
          <FormMessage>{fields.password.errors}</FormMessage>
        </FormItem>

        <FormItem>
          <TextField
            id="passwordConfirm"
            required
            type="password"
            label="パスワード（確認）"
            variant="outlined"
            name={fields.passwordConfirm.name}
          />
          <FormMessage>{fields.passwordConfirm.errors}</FormMessage>
        </FormItem>

        <Button type="submit" variant="contained" loading={isPending}>登録</Button>
      </Box>
    </Card>
  );
};
