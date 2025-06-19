import AdminNav from '@/app/admin/_components/admin-nav';
import { isAdmin } from '@/app/admin/utils';
import { auth } from '@/auth';
import { paths } from '@/config/paths';
import Typography from '@mui/material/Typography';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user) return redirect(paths.auth.login.getHref());

  if (isAdmin(session.user)) {
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
