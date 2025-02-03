import { auth } from '@/auth';
import { getRoleLabel } from '@/config/consts';
import { getUser } from '@/models/user';
import { getFormattedDateTimeFromObj } from '@/lib/datetime';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default async function Page() {
  const session = await auth()
  if (!session?.user?.id) return null

  const user = await getUser(session.user.id);
  if(!user) return null

  return (
    <div>
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.image} />
      </Avatar>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{getRoleLabel(user.role)}</p>
      <p>{getFormattedDateTimeFromObj(user.createdAt)}</p>
    </div>
  );
};
