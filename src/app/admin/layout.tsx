import React from 'react';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (session?.user?.role !== "ADMIN") {
    return notFound();
  }

  return (
    <div>
      {children}
    </div>
  )
}