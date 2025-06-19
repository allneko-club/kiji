import { Role } from '@/lib/users';
import { User } from 'next-auth';

export function isAdmin(user: User | undefined) {
  return user && user.role === Role.ADMIN;
}
