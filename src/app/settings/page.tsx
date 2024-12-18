import { auth } from '@/auth';

export default async function Page() {
  const session = await auth()

  if (!session?.user) return null

  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight">Settings</h1>
      <p>name {session.user.name}</p>
    </div>
  );
};
