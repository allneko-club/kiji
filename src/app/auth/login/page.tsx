import type { Metadata } from 'next';
import { Suspense } from 'react';
import LoginForm from '@/app/auth/login/_components/login-form';
import { CircularProgress } from '@mui/material';

export const metadata: Metadata = { title: "ログイン" };

export default function Page() {
  return (
    <Suspense fallback={<CircularProgress/>}>
      <LoginForm />
    </Suspense>
  );
};
