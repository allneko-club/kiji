import { User } from 'next-auth';
import { Role } from '@/config/consts';

export function isAdmin(user: User | undefined) {
  return user && user.role === Role.ADMIN;
}