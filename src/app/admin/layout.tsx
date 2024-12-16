import React from 'react';
import { auth } from '@/auth';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (session?.user?.role !== "ADMIN") {
    return <p>You are not authorized to view this page!</p>;
  }

  return (
    <div>
      {children}
    </div>
  )
}