"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { resetPasswordInput, resetPasswordInputSchema, useResetPassword } from '@/hooks/auth/reset-password';
import { H1 } from '@/components/ui/header';

export default function Page() {
  const form = useForm<resetPasswordInput>(
    { resolver: zodResolver(resetPasswordInputSchema), defaultValues: { email: "" }})
  const confirm = useResetPassword();
  const onSubmit = (data: resetPasswordInput) => confirm.mutate(data);

  return (
    <div className="mx-auto max-w-sm">
      <H1>パスワードリセット</H1>
      <p className="my-4">メールアドレスを入力してください。</p>

      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>

          {confirm.isError && <p className="text-orange-500">{confirm.error.message}</p>}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">送信</Button>
        </form>
      </Form>
    </div>
  );
};
