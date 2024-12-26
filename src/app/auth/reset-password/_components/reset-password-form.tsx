"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { resetPasswordInput, resetPasswordInputSchema, useResetPassword } from '@/hooks/auth/reset-password';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ResetPasswordForm() {
  const form = useForm<resetPasswordInput>(
    { resolver: zodResolver(resetPasswordInputSchema), defaultValues: { email: "" }})
  const reset = useResetPassword();
  const onSubmit = (data: resetPasswordInput) => reset.mutate(data);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">パスワードリセット</CardTitle>
        <CardDescription>
          メールアドレスを入力してください。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>

            {reset.isError && <p className="text-orange-500">{reset.error.message}</p>}

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
            <Button type="submit" disabled={reset.isPending}>送信</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
