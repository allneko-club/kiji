import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = { title: 'プライバシーポリシー' };

export default function Page() {

  return (
    <div>
      <Typography variant="h1">
        プライバシーポリシー
      </Typography>
    </div>
  );
};
