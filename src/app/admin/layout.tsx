import React from 'react';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import Sidebar from '@/app/admin/_components/sidebar';
import { UserRole } from '@/config/consts';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (session?.user?.role !== UserRole.ADMIN) {
    return notFound();
  }

  return (
    <div className="grid lg:grid-cols-5">
      <Sidebar className="hidden lg:block" />
      <div className="col-span-3 lg:col-span-4 lg:border-l">
        <div className="h-full px-4 py-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  )
}