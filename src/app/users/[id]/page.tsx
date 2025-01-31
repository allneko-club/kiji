import { UserInfo } from '@/app/users/[id]/_components/user-info';
import { getUser } from '@/models/user';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const id = (await params).id
  const user = await getUser(id);

  if (!user) {
    notFound()
  }

  return (
    <UserInfo user={user} />
  );
};
