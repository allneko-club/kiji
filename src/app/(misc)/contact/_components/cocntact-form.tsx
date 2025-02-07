'use client';
import { useActionState } from 'react';
import { contact } from '@/app/(misc)/contact/actions';
import { Button } from '@/components/ui/button';
import { FormItem, FormLabel, FormMessage } from '@/components/form';
import { Input } from '@/components/ui/input';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { contactInputSchema } from '@/app/(misc)/contact/schema';

export default function ContactForm() {
  const [lastResult, submitAction, isPending] = useActionState(contact, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contactInputSchema });
    },
  });

  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl">お問い合わせ</h1>
      <p>以下のフォームに入力してください。</p>

      <form id={form.id} className="grid gap-4 py-6" action={submitAction}>
        <FormMessage>{form.errors}</FormMessage>
        <FormItem>
          <FormLabel htmlFor="email">メールアドレス</FormLabel>
          <Input id="email" name={fields.email.name} />
          <FormMessage>{fields.email.errors}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel htmlFor="content">内容</FormLabel>
          <Input id="content" name={fields.content.name} />
          <FormMessage>{fields.content.errors}</FormMessage>
        </FormItem>

        <Button loading={isPending}>送信</Button>
      </form>
    </div>
  );
}