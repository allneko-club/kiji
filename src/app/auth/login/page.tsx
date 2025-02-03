import type { Metadata } from 'next';
import { Suspense } from 'react';
import LoginForm from '@/app/auth/login/_components/login-form';
import Loading from '@/components/loading';

export const metadata: Metadata = { title: "ログイン" };

export default function Page() {
  return (
    <Suspense fallback={<Loading/>}>
      <LoginForm />
    </Suspense>
  );
};
