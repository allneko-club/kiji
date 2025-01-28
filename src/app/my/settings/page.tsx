import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getRoleLabel } from '@/config/consts';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth()

  if (!session?.user) return null

  return (
    <div>
      <h1>Settings</h1>
      <Avatar className="h-8 w-8">
        <AvatarImage src={session.user.image ?? ""} />
        <AvatarFallback>KI</AvatarFallback>
      </Avatar>
      <p>{session.user.email}</p>
      <p>{getRoleLabel(session.user.role)}</p>
    </div>
  );
};
