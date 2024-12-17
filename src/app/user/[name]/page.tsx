import { api } from '@/lib/api-client';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
  const name = (await params).name
  const user = await api.get(`/users/${name}`);

  if (!user) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight">{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.createdAt}</p>
    </div>
  );
};
