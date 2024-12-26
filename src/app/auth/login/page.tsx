import type { Metadata } from 'next';
import LoginForm from '@/app/auth/login/_components/login-form';

export const metadata: Metadata = { title: "ログイン" };

export default function Page() {
  return <LoginForm />;
};
