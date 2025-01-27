"use client"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { resetPassword } from '@/app/auth/reset-password/actions';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';

export default function ResetPasswordForm() {
  const [state, submitAction, isPending] = useActionState(resetPassword, {errors: ""});

  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl">パスワードリセット</h1>
      <p>メールアドレスを入力してください。</p>

      <form className="grid gap-4 py-6" action={submitAction}>

        <div className="grid items-center gap-1.5">
          <Label htmlFor="email">メールアドレス</Label>
          <Input id="email" name="email" />
          {state?.errors && <p className="text-red-500">{state.errors}</p>}
        </div>

        <Button loading={isPending}>送信</Button>
      </form>
    </div>
  );
};
