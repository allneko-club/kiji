'use client';
import { resetPassword } from '@/app/auth/reset-password/actions';
import { useActionState } from 'react';
import { FormItem, FormMessage } from '@/components/form';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { resetPasswordInputSchema } from '@/app/auth/reset-password/schema';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function ResetPasswordForm() {
  const [lastResult, submitAction, isPending] = useActionState(resetPassword, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: resetPasswordInputSchema });
    },
  });

  return (
    <div>
      <Typography component="h1" variant="h3">パスワードリセット</Typography>
      <Typography>メールアドレスを入力してください</Typography>

      <form id={form.id} action={submitAction}>
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

        <Button type="submit" variant="contained" loading={isPending}>送信</Button>
      </form>
    </div>
  );
};
