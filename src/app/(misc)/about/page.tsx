import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = { title: 'このサイトについて' };

export default function Page() {
  return (
    <div>
      <Typography variant="h1">
        このサイトについて
      </Typography>
      <Typography>Kiji は Next.js で作成した CMS アプリケーションです。</Typography>
    </div>
  );
};
