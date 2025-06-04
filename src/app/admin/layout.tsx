import { ReactNode } from 'react';
import Sidebar from '@/app/admin/_components/sidebar';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { paths } from '@/config/paths';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: "マイページ" };

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth()

  if (!session?.user) return redirect(paths.auth.login.getHref());

  return (
  <div>
    <Sidebar/>
    <div>
      {children}
    </div>
  </div>

)
}