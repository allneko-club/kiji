import type { Metadata } from 'next';
import { DashboardInfo } from '@/app/admin/_components/dashboard-info';

export const metadata: Metadata = {
  title: "ダッシュボード",
  description: "ダッシュボード",
};

export default function Page() {
  return <DashboardInfo />;
};
