import { Role } from '@/lib/roles';
import { User } from '@prisma/client';

export function isAdmin(user: User | undefined) {
  return user && user.role === Role.ADMIN;
}
