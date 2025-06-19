import { paths } from '@/config/paths';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>ページが見つかりませんでした。</p>
      <Link href={paths.home.getHref()} replace>
        ホームに戻る
      </Link>
    </div>
  );
}
