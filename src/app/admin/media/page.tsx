import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'メディア' };

export default async function Page() {
  return (
    <>
      <Typography variant="h1">メディア</Typography>
    </>
  );
}
