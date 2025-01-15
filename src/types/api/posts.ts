import { User } from '@/types/api/users';

export type Post = {
  id: string;
  authorId: string;
  author?: User;
  title: string;
  body: string;
  public: boolean;
  createdAt: number;
};