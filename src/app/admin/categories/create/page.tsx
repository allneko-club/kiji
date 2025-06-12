import type { Metadata } from 'next';
import { CategoryForm } from '@/app/admin/categories/_components/category-form';


export const metadata: Metadata = { title: 'カテゴリーの追加' };

export default async function Page() {

  return (
    <CategoryForm />
  );
};
