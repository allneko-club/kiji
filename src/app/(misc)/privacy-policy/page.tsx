import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = { title: "プライバシーポリシー" };

export default function Page() {

  return (
    <div>
      <Typography component="h1" variant="h3">
        プライバシーポリシー
      </Typography>
    </div>
  );
};
