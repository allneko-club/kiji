"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import { useRegister, registerInputSchema, RegisterInput } from '@/hooks/auth/register';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export default function RegisterForm() {
  const form = useForm<RegisterInput>(
    { resolver: zodResolver(registerInputSchema),
    defaultValues: { name: "", email: "", password: "", passwordConfirm: "" }
    })
  const register = useRegister();
  const onSubmit = (data: RegisterInput) => register.mutate(data);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">ユーザー登録</CardTitle>
        <CardDescription>
          以下のフォームに入力してください。
        </CardDescription>
      </CardHeader>
      <CardContent>

        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>

            {register.isError && <p className="text-orange-500">{register.error.message}</p>}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ユーザー名</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>パスワード</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>8文字以上の半角英数字にしてください。</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>パスワード（確認）</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">登録</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
