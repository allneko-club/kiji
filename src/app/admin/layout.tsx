import AdminNav from '@/app/admin/_components/admin-nav';
import { isAdmin } from '@/app/admin/utils';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const user = { id: 1, role: 1 };
  // const user = await getUserById(session.user.id);
  // if (!user) {
  // return signOut();
  // }

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
