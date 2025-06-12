import type { Metadata } from 'next';
import { TagForm } from '@/app/admin/tags/_components/tag-form';


export const metadata: Metadata = { title: 'タグの追加' };

export default async function Page() {

  return (
    <TagForm />
  );
};
