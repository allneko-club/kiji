import type { Metadata } from 'next';
import { CreateTagForm } from '@/app/admin/tags/create/create-tag-form';


export const metadata: Metadata = { title: 'タグの追加' };

export default async function Page() {

  return (
    <CreateTagForm />
  );
};
