import ResetPasswordForm from '@/app/auth/reset-password/_components/reset-password-form';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'パスワードリセット申請' };

export default function Page() {
  return <ResetPasswordForm />;
}
