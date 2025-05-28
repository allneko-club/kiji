import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = { title: "お問い合わせ完了" };

export default function Page() {
  return (
    <div>
      <Typography component="h1" variant="h3">
        お問い合わせが完了しました
      </Typography>
      <Typography>返信まで２〜３営業日かかります。</Typography>
    </div>
  );
};
