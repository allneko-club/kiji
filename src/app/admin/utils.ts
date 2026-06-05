import { Role } from '@/features/users/roles';

export function isAdmin(user: any | undefined) {
  return user && user.role === Role.ADMIN;
}
