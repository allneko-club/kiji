"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { contactInput, contactInputSchema, useConfirm } from '@/hooks/misc/contact';

export default function Page() {
  const form = useForm<contactInput>(
  { resolver: zodResolver(contactInputSchema),
    defaultValues: { email: "", content: "" }
  })
  const confirm = useConfirm();
  const onSubmit = (data: contactInput) => confirm.mutate(data);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">お問い合わせ</CardTitle>
        <CardDescription>
          以下のフォームに入力してください。
        </CardDescription>
      </CardHeader>
      <CardContent>

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
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>内容</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">送信</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
