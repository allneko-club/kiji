import { auth } from '@/auth';
import { H1 } from '@/components/ui/header';

export const DashboardInfo = async () => {
  const session = await auth()

  if (!session?.user) return null

  return (
    <>
      <H1>Dashboard</H1>
      <p>{session.user.email}</p>
      <p>{session.user.image}</p>
      <p>{session.user.role}</p>
    </>
  );
};