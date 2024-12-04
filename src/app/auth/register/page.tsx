"use client"
import RegisterForm from '@/components/auth/register-form';

export default function Page() {
  return (
    <div>
      <div className="flex h-screen w-full items-center justify-center px-4">
        <RegisterForm />
      </div>
    </div>
  );
};
