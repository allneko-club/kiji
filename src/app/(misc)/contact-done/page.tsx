import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'お問い合わせ完了' };

export default function Page() {
  return (
    <div>
      <Typography variant="h1">お問い合わせが完了しました</Typography>
      <Typography>返信まで２〜３営業日かかります。</Typography>
    </div>
  );
}
