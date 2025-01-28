"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useActionState } from 'react';
import { register } from '@/app/auth/register/actions';
import { Label } from '@/components/ui/label';
import { FormItem, FormMessage } from '@/components/form';

export default function RegisterForm() {
  const [state, submitAction, isPending] = useActionState(
    register,
    {
      name:'',
      email:'',
      password:'',
      passwordConfirm:'',
      errors: {name: '', email: '', password: '', passwordConfirm: ''}
    }
  );

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">ユーザー登録</CardTitle>
        <CardDescription>
          以下のフォームに入力してください。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" action={submitAction}>
          <FormItem>
            <Label htmlFor="name">ユーザー名</Label>
            <Input id="name" name="name" defaultValue={state.name} />
            <FormMessage>{state?.errors.name}</FormMessage>
          </FormItem>

          <FormItem>
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" name="email" defaultValue={state.email} />
            <FormMessage>{state?.errors.email}</FormMessage>
          </FormItem>

          <FormItem>
            <Label htmlFor="password">パスワード</Label>
            <Input id="password" name="password" defaultValue={state.password}/>
            <p className="text-sm text-muted-foreground">8文字以上の半角英数字にしてください。</p>
            <FormMessage>{state?.errors.password}</FormMessage>
          </FormItem>

          <FormItem>
            <Label htmlFor="passwordConfirm">パスワード（確認）</Label>
            <Input id="passwordConfirm" name="passwordConfirm" defaultValue={state.passwordConfirm}/>
            <FormMessage>{state?.errors.passwordConfirm}</FormMessage>
          </FormItem>

          <Button className="w-full" disabled={isPending}>登録</Button>
        </form>
      </CardContent>
    </Card>
  );
};
