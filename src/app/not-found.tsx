import { paths } from '@/config/paths';
import Link from 'next/link';
import { H1 } from '@/components/ui/header';

export default function NotFoundPage() {
  return (
    <div className="container">
      <H1>404 - Not Found</H1>
      <p>ページが見つかりませんでした。</p>
      <Link href={paths.home.getHref()} replace>
        ホームに戻る
      </Link>
    </div>
  );
};
