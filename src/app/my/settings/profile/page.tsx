import { api } from '@/lib/api-client';
import { signOut } from "@/auth"

export default async function Page() {
  const user = await api.get('/auth/me');

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
