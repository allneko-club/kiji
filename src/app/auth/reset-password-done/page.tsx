import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = { title: "パスワードリセット申請完了" };

export default function Page() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">パスワードをリセットするためのメールを送信しました</CardTitle>
      </CardHeader>
      <CardContent>
        メールを確認してパスワードをリセットしてください。
      </CardContent>
    </Card>
  );
};
