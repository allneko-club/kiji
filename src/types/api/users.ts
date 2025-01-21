import { UserRole } from '@/config/consts';

export type User = {
  id: string;
  name: string;
  email: string;
  role: (typeof UserRole)[keyof typeof UserRole];
  image: string;
  createdAt: number;
};