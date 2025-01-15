// import { UserRole } from '@/config/consts';

export type User = {
  id: string;
  name: string;
  email: string;
  // todo symbol型を使うとmsw側で型エラーになるためstring型にしている
  // role: (typeof UserRole)[keyof typeof UserRole];
  role: string;
  image: string;
  createdAt: number;
};