import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '設定' };

export default async function Page() {
  return (
    <>
      <Typography variant="h1">設定</Typography>
    </>
  );
}
