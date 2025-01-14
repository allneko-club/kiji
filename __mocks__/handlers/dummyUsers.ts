import { UserRole } from '@/config/consts';

export const admin =  {
  "id": "T3qHqoW4zzcpGLU7oY8hL",
  "name": "dummy_admin",
  "email": "admin@example.com",
  "role": UserRole.ADMIN,
  "image": "http://localhost:3000/vercel.svg",
  "bio": "",
  "createdAt": 1733617337896
};

export const user =  {
  "id": "T3qHqoW4zzcpGLU777777",
  "name": "dummy_user",
  "email": "user@example.com",
  "role": UserRole.USER,
  "image": "http://localhost:3000/vercel.svg",
  "bio": "",
  "createdAt": 1733617337896
};

export const getDummyUsers = () => {
  return [admin, user]
}