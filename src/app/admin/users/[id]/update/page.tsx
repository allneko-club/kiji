import { UserForm } from '@/app/admin/users/_components/user-form';
import { getUserById } from '@/features/users/models/user';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = { title: 'ユーザーの編集' };

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const id = (await params).id;

  const user = await getUserById(id);
  if (!user) {
    notFound();
  }

  return (
    <>
      <Typography variant="h1">ユーザーの編集</Typography>
      <UserForm user={user} />
    </>
  );
}
