import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { api } from '@/lib/api-client';
import { User } from '@/types/api';
import { ZodError } from 'zod';
import GitHub from 'next-auth/providers/github';
import { z } from 'zod';

export const loginInputSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

async function loginUser(email: string, password:string): Promise<User|null> {
  try{
    return await api.post<User>('/auth/login', { email, password })
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // You can specify which fields should be submitted, by adding keys to the `credentials` object.
  // e.g. domain, username, password, 2FA token, etc.
  credentials: {
    email: {},
    password: {},
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const { email, password } = await loginInputSchema.parseAsync(credentials)
          const user = await loginUser(email, password);
          if(!user) return null;

          // return JSON object with the user data
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
        }
      },
    }),
    GitHub,
  ]
});