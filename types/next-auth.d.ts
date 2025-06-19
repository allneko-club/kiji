// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { User as DefaultUser } from '@auth/core/src/types';
import { JWT as DefaultJWT } from 'next-auth/jwt';

// https://authjs.dev/getting-started/typescript?framework=express

declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends DefaultUser {
    role: number;
  }

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    id: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: number;
  }
}
