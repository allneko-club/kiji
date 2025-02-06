import Link from 'next/link';
import { paths } from '@/config/paths';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: "プロフィール" };

export default async function Page() {

  return (
    <div>
      <h1>Settings</h1>
      <div>
        <Link href={paths.my.profile.getHref()}>プロフィール</Link>
      </div>
      <div>
        <Link href={paths.my.settings.deleteAccount.getHref()}>アカウント削除</Link>
      </div>
    </div>
  );
};
