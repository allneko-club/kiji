import { auth } from '@/auth';
import { getRoleLabel } from '@/config/consts';

export default async function Page() {
  const session = await auth()

  if (!session?.user) return null

  return (
    <div>
      <h1>マイページ</h1>
      <p>{session.user.email}</p>
      <p>{session.user.image}</p>
      <p>{getRoleLabel(session.user.role)}</p>
    </div>
  );
};
