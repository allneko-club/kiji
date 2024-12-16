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
import { Label } from '@/components/ui/label';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = decodeURIComponent(searchParams?.get('callbackUrl') || '/');
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

          <form action={formAction} className="grid gap-4">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" name="email" type="email" />

            <Label htmlFor="password">パスワード</Label>
            <Input id="password" name="password" type="password" />
            <Link
              href={paths.auth.resetPassword.getHref()}
              className="ml-auto inline-block text-sm underline text-muted-foreground"
            >
              パスワードを忘れましたか？
            </Link>

            {/* Auth.jsでログイン後のリダイレクト先を設定するために必要 */}
            <input id="redirectTo" name="redirectTo" hidden defaultValue={redirectTo} />

            <Button type="submit" className="w-full" aria-disabled={isPending}>
              ログイン
            </Button>
          </form>

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