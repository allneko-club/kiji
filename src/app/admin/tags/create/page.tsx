import { TagForm } from '@/app/admin/tags/_components/tag-form';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'タグの追加' };

export default async function Page() {
  return (
    <>
      <Typography variant="h1">タグの追加</Typography>
      <TagForm />
    </>
  );
}
