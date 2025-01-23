import { UserInfo } from '@/app/users/[id]/_components/user-info';
import { getUser } from '@/services/users/model';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const id = (await params).id
  const user = await getUser(Number(id));

  if (!user) {
    notFound()
  }

  return (
    <UserInfo user={user} />
  );
};
