"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useActionState } from 'react';
import { register } from '@/app/auth/register/actions';
import { FormDescription, FormItem, FormLabel, FormMessage } from '@/components/form';
import { useForm } from '@conform-to/react';
import { registerInputSchema } from '@/app/auth/register/schema';
import { parseWithZod } from '@conform-to/zod';
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">ユーザー登録</CardTitle>
        <CardDescription>
          以下のフォームに入力してください。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4"
          id={form.id}
          onSubmit={form.onSubmit}
          action={formData => {
            action(formData);
            toast('登録しました');
          }}
          noValidate
        >
          <FormMessage>{form.errors}</FormMessage>
          <FormItem>
            <FormLabel htmlFor="name">ユーザー名</FormLabel>
            <Input id="name" name={fields.name.name} />
            <FormMessage>{fields.name.errors}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor="email">メールアドレス</FormLabel>
            <Input id="email" name={fields.email.name} />
            <FormMessage>{fields.email.errors}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor="password">パスワード</FormLabel>
            <Input id="password" type="password" name={fields.password.name} />
            <FormDescription>8文字以上の半角英数字にしてください。</FormDescription>
            <FormMessage>{fields.password.errors}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor="passwordConfirm">パスワード（確認）</FormLabel>
            <Input id="passwordConfirm" type="password" name={fields.passwordConfirm.name} />
            <FormMessage>{fields.passwordConfirm.errors}</FormMessage>
          </FormItem>

          <Button className="w-full" disabled={isPending}>登録</Button>
        </form>
      </CardContent>
    </Card>
  );
};
