import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { UserForm } from '@/app/admin/users/_components/user-form';
import { getUser } from '@/models/user';

export const metadata: Metadata = {title: "タグの編集"};

type Props = {
  params: Promise<{ id: string }>
}


export default async function Page({ params }: Props) {

  const id = (await params).id

  const user = await getUser(id)
  if(!user){
    notFound()
  }

  return (
    <UserForm user={user} />
  );
};
