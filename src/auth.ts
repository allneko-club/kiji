import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn } = NextAuth({
  ...authConfig,
});
