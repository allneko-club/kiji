import type { Metadata } from 'next';
import { CreateCategoryForm } from '@/app/admin/categories/create/create-category-form';


export const metadata: Metadata = { title: 'カテゴリーの追加' };

export default async function Page() {

  return (
    <CreateCategoryForm />
  );
};
