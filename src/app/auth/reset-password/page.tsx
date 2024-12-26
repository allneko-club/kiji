import type { Metadata } from 'next';
import ResetPasswordForm from '@/app/auth/reset-password/_components/reset-password-form';

export const metadata: Metadata = { title: "パスワードリセット申請" };

export default function Page() {
  return <ResetPasswordForm/>;
};
