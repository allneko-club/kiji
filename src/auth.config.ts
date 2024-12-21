import type { DefaultSession } from 'next-auth';
import { UserRole } from '@/config/consts';

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   * https://authjs.dev/getting-started/typescript
   */
  interface Session {
    user: {
      role: UserRole
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
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
    session({ session, token }) {
      session.user.id = token.id
      session.user.role = token.role
      return session
    },
  },
  providers: [],
};