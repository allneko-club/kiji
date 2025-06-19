import { CategoryForm } from '@/app/admin/categories/_components/category-form';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'カテゴリーの追加' };

export default async function Page() {
  return (
    <>
      <Typography variant="h1">カテゴリーの追加</Typography>
      <CategoryForm />
    </>
  );
}
