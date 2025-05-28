import NextLink from 'next/link'
import Link from '@mui/material/Link';
import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = { title: "退会完了" };

export default function Page() {
  return (
    <div>
      <Typography component="h1" variant="h3">
        アカウントを削除しました
      </Typography>
      <Link href="/" component={NextLink}>
        ホームに戻る
      </Link>
    </div>
  );
};
