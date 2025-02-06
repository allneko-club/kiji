import type { Metadata } from 'next';

export const metadata: Metadata = { title: "このサイトについて" };

export default function Page() {
  return (
    <div>
      <h1>このサイトについて</h1>
      <p>Kiji は Next.js で作成した CMS アプリケーションです。</p>
    </div>
  );
};
