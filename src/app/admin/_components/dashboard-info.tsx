import { auth } from '@/auth';

export const DashboardInfo = async () => {
  const session = await auth()

  if (!session?.user) return null

  return (
    <>
      <h1 className="text-xl">Dashboard</h1>
      <p>{session.user.email}</p>
      <p>{session.user.image}</p>
      <p>{session.user.role}</p>
    </>
  );
};