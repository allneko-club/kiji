import type { Metadata } from 'next';

export const metadata: Metadata = { title: "お問い合わせ完了" };

export default function Page() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md">
        <h1>お問い合わせが完了しました</h1>
        <p>返信まで２〜３営業日かかります。</p>
      </div>
    </div>
  );
};
