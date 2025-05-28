'use client';
import { useActionState } from 'react';
import { contact } from '@/app/(misc)/contact/actions';
import { FormItem, FormMessage } from '@/components/form';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { contactInputSchema } from '@/app/(misc)/contact/schema';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function ContactForm() {
  const [lastResult, submitAction, isPending] = useActionState(contact, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contactInputSchema });
    },
  });

  return (
    <div>
      <Typography component="h1" variant="h3">お問い合わせ</Typography>
      <Typography>以下のフォームに入力してください。</Typography>

      <form id={form.id} action={submitAction}>
        <FormMessage>{form.errors}</FormMessage>
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
            id="content"
            required
            label="内容"
            variant="outlined"
            multiline
            rows={4}
            name={fields.content.name}
          />
          <FormMessage>{fields.content.errors}</FormMessage>
        </FormItem>
        <Button type="submit" variant="contained" loading={isPending}>送信</Button>
      </form>
    </div>
  );
}