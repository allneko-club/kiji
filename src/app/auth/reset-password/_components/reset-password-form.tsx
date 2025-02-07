'use client';
import { Button } from '@/components/ui/button';
import { resetPassword } from '@/app/auth/reset-password/actions';
import { useActionState } from 'react';
import { FormItem, FormMessage } from '@/components/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { resetPasswordInputSchema } from '@/app/auth/reset-password/schema';

export default function ResetPasswordForm() {
  const [lastResult, submitAction, isPending] = useActionState(resetPassword, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: resetPasswordInputSchema });
    },
  });

  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl">パスワードリセット</h1>
      <p>メールアドレスを入力してください。</p>

      <form id={form.id} className="grid gap-4 py-6" action={submitAction}>
        <FormItem>
          <Label htmlFor="email">メールアドレス</Label>
          <Input id="email" name={fields.email.name} />
          <FormMessage>{fields.email.errors}</FormMessage>
        </FormItem>

        <Button loading={isPending}>送信</Button>
      </form>
    </div>
  );
};
