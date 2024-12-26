import { api } from '@/lib/api-client';
import { signOut } from "@/auth"
import { H1 } from '@/components/ui/header';

export default async function Page() {
  const user = await api.get('/auth/me');

  if (!user) {
    await signOut()
  }

  return (
    <div>
      <H1>{user.name}</H1>
      <p>{user.email}</p>
      <p>{user.image}</p>
      <p>{user.role}</p>
      <p>{user.createdAt}</p>
    </div>
  );
};
