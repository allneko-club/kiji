import LoginForm from '@/app/auth/login/_components/login-form';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'ログイン' };

export default function Page() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
