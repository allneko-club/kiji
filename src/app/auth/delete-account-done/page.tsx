import Link from 'next/link';
import { paths } from '@/config/paths';
import { Button } from '@/components/ui/button';

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
