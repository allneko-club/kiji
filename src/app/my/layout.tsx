import React from 'react';
import MyPageNav from '@/app/my/_components/mypage-nav';

export default async function MyPageLayout({ children }: { children: React.ReactNode }) {

  return (
    <div>
      <MyPageNav/>
      {children}
    </div>
  )
}