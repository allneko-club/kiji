import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center">
      {children}
    </div>
  );
};
