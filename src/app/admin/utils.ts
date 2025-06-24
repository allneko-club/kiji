import { Role } from '@/lib/users';
import { User } from '@prisma/client';

export function isAdmin(user: User | undefined) {
  return user && user.role === Role.ADMIN;
}
