'use client';

import { contact } from '@/app/(misc)/contact/actions';
import { ZContact } from '@/schemas/contact';
import { FormProvider, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useActionState } from 'react';

export default function ContactForm() {
  const [lastResult, submitAction, isPending] = useActionState(contact, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ZContact });
    },
  });

  return (
    <div>
      <Typography variant="h1">お問い合わせ</Typography>
      <Typography>以下のフォームに入力してください。</Typography>

      <FormProvider context={form.context}>
        <form id={form.id} onSubmit={form.onSubmit} action={submitAction} noValidate>
          <Stack spacing={4} marginY={4}>
            <FormControl required>
              <FormLabel htmlFor={fields.email.name}>メールアドレス</FormLabel>
              <TextField
                id={fields.email.id}
                name={fields.email.name}
                defaultValue={fields.email.initialValue}
                error={!fields.email.valid}
                helperText={fields.email.errors}
              />
            </FormControl>
            <FormControl required>
              <FormLabel htmlFor={fields.content.name}>内容</FormLabel>
              <TextField
                id={fields.content.id}
                name={fields.content.name}
                defaultValue={fields.content.initialValue}
                error={!fields.content.valid}
                helperText={fields.content.errors}
                multiline
                rows={4}
              />
            </FormControl>

            <Button type="submit" variant="contained" loading={isPending}>
              送信
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </div>
  );
}
