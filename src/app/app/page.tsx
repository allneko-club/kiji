import { auth } from '@/auth';

export default async function Page() {
  const session = await auth()

  if(!session?.user) return null

  return (
    <div>
      <h1 className="">Dashboard</h1>
      <p>セッション</p>
      <p>{session.user.name}</p>
    </div>
  );
};
