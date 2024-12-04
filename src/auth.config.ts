import type { DefaultSession } from 'next-auth';

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       * DefaultSession["user"]: {id, name, email, image}
       */
    user: DefaultSession["user"]
  }
}

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/app');
      if (isOnDashboard) {
         // 未認証のユーザーはログインページにリダイレクトされる
        return isLoggedIn;
      }
      return true;
    },
    jwt({ token, user }) {

      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id
      return session
    },
  },
  providers: [],
};