import { auth } from '@/auth';
import { getRoleLabel } from '@/config/consts';
import { getUser } from '@/models/user';
import { getFormattedDateTimeFromObj } from '@/lib/datetime';
import type { Metadata } from 'next';
import { Avatar } from '@mui/material';

export const metadata: Metadata = { title: "プロフィール" };

export default async function Page() {
  const session = await auth()
  if (!session?.user?.id) return null

  const user = await getUser(session.user.id);
  if(!user) return null

  return (
    <div>
      <Avatar alt={user.name} src={user.image}>{user.name}</Avatar>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{getRoleLabel(user.role)}</p>
      <p>{getFormattedDateTimeFromObj(user.createdAt)}</p>
    </div>
  );
};
