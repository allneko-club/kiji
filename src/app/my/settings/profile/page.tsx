import { api } from '@/lib/api-client';
import { signOut } from "@/auth"
import { User } from '@/types/api/users';

export default async function Page() {
  const user = await api.get<User>('/auth/me');

  if (!user) {
    await signOut()
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.image}</p>
      <p>{user.role}</p>
      <p>{user.createdAt}</p>
    </div>
  );
};
