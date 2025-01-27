import { ReactNode } from 'react';
import Sidebar from '@/app/my/_components/sidebar';

export default async function Layout({ children }: { children: ReactNode }) {

  return (
  <div className="grid md:grid-cols-5">
    <Sidebar className="hidden md:block" />
    <div className="col-span-3 md:col-span-4 md:border-l">
      <div className="h-full px-4 py-6 md:px-8">
        {children}
      </div>
    </div>
  </div>

)
}