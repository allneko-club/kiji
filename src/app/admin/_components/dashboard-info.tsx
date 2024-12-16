'use client';
import { useMe } from '@/hooks/auth/me';

export const DashboardInfo = () => {
  const user = useMe();

  if(!user?.data){
    return null;
  }

  return (
    <>
      <h1 className="text-xl">Dashboard</h1>
      <h4 className="my-3">
        Name : {user.data.name}
      </h4>
      <h4 className="my-3">
        Email : {user.data.email}
      </h4>
      <h4 className="my-3">
        Role : {user.data.role}
      </h4>
    </>
  );
};