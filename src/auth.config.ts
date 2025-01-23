import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import GitHub from 'next-auth/providers/github';
import { api } from '@/lib/api-client';

type UserSession = {
  id: string;
  name: string;
  email: string;
  role: number;
  image: string;
};

export const loginInputSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

async function loginUser(email: string, password:string): Promise<UserSession|null> {
  try{
    return await api.post<UserSession>('/auth/login', { email, password })
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnMy = nextUrl.pathname.startsWith('/my');
      if (isOnAdmin || isOnMy) {
         // 未認証のユーザーはログインページにリダイレクトされる
        return isLoggedIn;
      }

      return true;
    },
    jwt({ token, user }) {

      if (user) { // User is available during sign-in
        token.id = user.id
        token.role = user.role
      }

      return token
    },
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const { email, password } = await loginInputSchema.parseAsync(credentials)
          const user = await loginUser(email, password);
          if(!user) return null;

          // return JSON object with the user data
          return user;
        } catch {
          // Return `null` to indicate that the credentials are invalid
          return null
        }
      },
    }),
    GitHub,
  ],
} satisfies NextAuthConfig;