// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT as DefaultJWT } from 'next-auth/jwt';

// https://authjs.dev/getting-started/typescript?framework=express

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
  }
}
