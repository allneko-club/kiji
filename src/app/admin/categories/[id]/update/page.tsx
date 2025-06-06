import type { Metadata } from 'next';
import { UpdateCategoryForm } from '@/app/admin/categories/[id]/update/update-category-form';
import { getCategory } from '@/models/category';
import { notFound, redirect } from 'next/navigation';
import { paths } from '@/config/paths';

export const metadata: Metadata = {title: "カテゴリーの編集"};

type Props = {
  params: Promise<{ id: string }>
}


export default async function Page({ params }: Props) {

  const id = Number((await params).id)
  if(Number.isNaN(id) || id < 1){
    redirect(paths.admin.categories.getHref());
  }

  const category = await getCategory(id)
  if(!category){
    notFound()
  }

  return (
    <UpdateCategoryForm category={category} />
  );
};
