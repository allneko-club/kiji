import { UserInfo } from '@/app/admin/users/[id]/_components/user-info';
import { getUser } from '@/models/user';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const id = (await params).id;
    const user = await getUser(id);
    return { title: user ? `${user.name}のプロフィール` : 'Not Found' };
  } catch {
    return { title: 'Not Found' };
  }
}

export default async function Page({ params }: Props) {
  const id = (await params).id;
  const user = await getUser(id);

  if (!user) {
    notFound();
  }

  return (
    <UserInfo user={user} />
  );
};
