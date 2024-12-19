import { api } from '@/lib/api-client';
import { notFound } from 'next/navigation';
import dayjs from 'dayjs';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id
  const user = await api.get(`/users/${id}`);
  return { title: user.name }
}

export default async function Page({ params }: Props) {
  const id = (await params).id
  const user = await api.get(`/users/${id}`);

  if (!user) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight">{user.name}</h1>
      <p>メールアドレス：{user.email}</p>
      <p>権限：{user.role}</p>
      <p>登録日時：{dayjs(user.createdAt).format()}</p>
    </div>
  );
};
