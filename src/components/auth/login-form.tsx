'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import { paths } from '@/config/paths';
import { useForm } from 'react-hook-form';
import { LoginInput, loginInputSchema } from '@/hooks/auth/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('callbackUrl');
  const form = useForm<LoginInput>(
    { resolver: zodResolver(loginInputSchema),
      defaultValues: { email: "", password: "" }
    })
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">ログイン</CardTitle>
        <CardDescription>
          メールアドレスと、パスワードを入力してください。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {errorMessage && (<p className="text-orange-500">{errorMessage}</p>)}

          <Form {...form}>
            {/* todo action と onSubmitを同時に使えない。onSubmitを指定しないとバリデーションが実行されない */}
            <form action={formAction} className="grid gap-4">
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
                    <FormDescription>
                      <Link href="#" className="ml-auto inline-block text-sm underline">
                        パスワードを忘れましたか？
                      </Link>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Auth.jsでログイン後のリダイレクト先を設定するために必要 */}
              <input
                id="redirectTo"
                name="redirectTo"
                hidden
                defaultValue={redirectTo ? decodeURIComponent(redirectTo) : '/'}
              />

              <Button type="submit" className="w-full" aria-disabled={isPending}>
                ログイン
              </Button>
            </form>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              または、他のアカウントでログイン
            </span>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            GitHub でログイン
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          アカウントが無いですか？
          <Link className="underline" href={paths.auth.register.getHref()}>
            登録する
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}