import Link from 'next/link';
import { paths } from '@/config/paths';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: "退会完了" };

export default function Page() {
  return (
    <div>
      <h1>アカウントを削除しました</h1>
      <Button asChild>
        <Link href={paths.home.getHref()}>ホームに戻る</Link>
      </Button>
    </div>
  );
};
