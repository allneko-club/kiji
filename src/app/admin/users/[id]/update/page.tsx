import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { UpdateUserForm } from '@/app/admin/users/[id]/update/update-user-form';
import { getUser } from '@/models/user';

export const metadata: Metadata = {title: "タグの編集"};

type Props = {
  params: Promise<{ id: string }>
}


export default async function Page({ params }: Props) {

  const id = (await params).id

  const tag = await getUser(id)
  if(!tag){
    notFound()
  }

  return (
    <UpdateUserForm user={tag} />
  );
};
