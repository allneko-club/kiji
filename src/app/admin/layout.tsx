import AdminNav from '@/app/admin/_components/admin-nav';
import { isAdmin } from '@/app/admin/utils';
import { auth } from '@/auth';
import { getUserById } from '@/features/users/models/user';
import { paths } from '@/lib/paths';
import Typography from '@mui/material/Typography';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session) {
    return redirect(paths.auth.login.getHref());
  }

  const user = await getUserById(session.user.id);
  if (!user) {
    return signOut();
  }

  if (isAdmin(user)) {
    return (
      <>
        <AdminNav />
        <div>{children}</div>
      </>
    );
  } else {
    return <Typography>権限がありません</Typography>;
  }
}
