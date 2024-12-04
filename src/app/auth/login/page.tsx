"use client"
import LoginForm from '@/components/auth/login-form';

export default function Page() {
  return (
    <div>
      <div className="flex h-screen w-full items-center justify-center px-4">
        <LoginForm />
      </div>
    </div>
  );
};
