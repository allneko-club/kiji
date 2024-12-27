import type { Metadata } from 'next';
import { Dashboard } from '@/app/admin/_components/dashboard';

export const metadata: Metadata = {
  title: "ダッシュボード",
  description: "ダッシュボード",
};

export default function Page() {
  return <Dashboard />;
};
