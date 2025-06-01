import RegisterForm from '@/app/auth/register/_components/register-form';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'アカウント登録' };

export default function Page() {
  return <RegisterForm />;
};
