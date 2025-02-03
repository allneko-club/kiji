'use client';
import { Button } from '@/components/ui/button';
import { resetPassword } from '@/app/auth/reset-password/actions';
import { useActionState } from 'react';
import { FormItem, FormMessage } from '@/components/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function ResetPasswordForm() {
  const [state, submitAction, isPending] = useActionState(
    resetPassword,
    {email:'', errors: { email: '' }}
  );

  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl">パスワードリセット</h1>
      <p>メールアドレスを入力してください。</p>

      <form className="grid gap-4 py-6" action={submitAction}>
        <FormItem>
          <Label htmlFor="email">メールアドレス</Label>
          <Input id="email" name="email" defaultValue={state.email} />
          <FormMessage>{state?.errors.email}</FormMessage>
        </FormItem>

        <Button loading={isPending}>送信</Button>
      </form>
    </div>
  );
};
