import { getUserById } from '@/api/user';
import { UserInfo } from '@/app/admin/users/[id]/_components/user-info';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const id = (await params).id;
    const user = await getUserById(id);
    return { title: user ? `${user.name}のプロフィール` : 'Not Found' };
  } catch {
    return { title: 'Not Found' };
  }
}

export default async function Page({ params }: Props) {
  const id = (await params).id;
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return <UserInfo user={user} />;
}
