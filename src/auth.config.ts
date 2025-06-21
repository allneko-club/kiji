import { SESSION_MAX_AGE } from '@/lib/consts';
import { getUserByCredentials } from '@/module/auth/lib/user';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import { z } from 'zod';

export const loginInputSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export const authConfig = {
  pages: {
    signIn: '/auth/login',
    signOut: '/',
    error: '/auth/login', // Error code passed in query string as ?error=
  },
  session: {
    maxAge: SESSION_MAX_AGE,
    strategy: 'jwt',
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
      if (!user) {
        return token;
      }

      return {
        ...token,
        id: user.id!,
        role: user.role,
      };
    },

    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  providers: [
    Credentials({
      id: 'credentials',
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: 'Email Address',
          type: 'email',
          placeholder: 'Your email address',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Your password',
        },
      },
      async authorize(credentials) {
        try {
          const { email, password } = await loginInputSchema.parseAsync(credentials);

          // ユーザーが存在しない場合はnull, 存在する場合はユーザーデータのオブジェクトを返す
          return await getUserByCredentials(email, password);
        } catch {
          // Return `null` to indicate that the credentials are invalid
          return null;
        }
      },
    }),
    GitHub,
  ],
} satisfies NextAuthConfig;
