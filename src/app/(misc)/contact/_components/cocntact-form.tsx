'use client';
import { useActionState } from 'react';
import { contact } from '@/app/(misc)/contact/actions';
import { Button } from '@/components/ui/button';
import { FormItem, FormLabel, FormMessage } from '@/components/form';
import { Input } from '@/components/ui/input';

export default function ContactForm() {
  const [state, submitAction, isPending] = useActionState(
    contact,
    {
      email:'',
      content:'',
      errors: {email: '', content: ''}
    }
  );

  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl">お問い合わせ</h1>
      <p>以下のフォームに入力してください。</p>

      <form className="grid gap-4 py-6" action={submitAction}>
        <FormItem>
          <FormLabel htmlFor="email">メールアドレス</FormLabel>
          <Input id="email" name="email" defaultValue={state.email} />
          <FormMessage>{state?.errors.email}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel htmlFor="content">内容</FormLabel>
          <Input id="content" name="content" defaultValue={state.content} />
          <FormMessage>{state?.errors.content}</FormMessage>
        </FormItem>

        <Button loading={isPending}>送信</Button>
      </form>
    </div>
  );
}