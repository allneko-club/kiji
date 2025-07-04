import { CategoryForm } from '@/app/admin/categories/_components/category-form';
import { getCategoryById } from '@/features/posts/models/category';
import { paths } from '@/lib/paths';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

export const metadata: Metadata = { title: 'カテゴリーの編集' };

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const id = Number((await params).id);
  if (Number.isNaN(id) || id < 1) {
    redirect(paths.admin.categories.getHref());
  }

  const category = await getCategoryById(id);
  if (!category) {
    notFound();
  }

  return (
    <>
      <Typography variant="h1">カテゴリーの編集</Typography>
      <CategoryForm category={category} />
    </>
  );
}
