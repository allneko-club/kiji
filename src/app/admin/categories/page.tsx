import { CategoriesTable } from '@/app/admin/categories/_components/categories-table';
import { paths } from '@/config/paths';
import { getCategories } from '@/models/category';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import NextLink from 'next/link';

export const metadata: Metadata = { title: 'カテゴリー' };

export default async function Page() {
  const categories = await getCategories();

  return (
    <div>
      <Typography variant="h1">カテゴリー</Typography>
      <Button variant="contained" component={NextLink} href={paths.admin.categories.create.getHref()}>
        追加
      </Button>
      <CategoriesTable categories={categories} />
    </div>
  );
}
