import React from 'react';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import AdminNav from '@/app/admin/_components/admin-nav';
import { UserRole } from '@/config/consts';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (session?.user?.role !== UserRole.ADMIN) {
    return notFound();
  }

  return (
    <div>
      <AdminNav />
      {children}
    </div>
  )
}