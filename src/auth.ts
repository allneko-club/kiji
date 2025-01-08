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

const providers: any[] = [GitHub]

if (process.env.NODE_ENV === "development") {
  providers.push(
    Credentials({
      authorize: (credentials) => {
        if (credentials.password === "password") {
          return {
            email: "bob@alice.com",
            name: "Bob Alice",
            image: "https://avatars.githubusercontent.com/u/67470890?s=200&v=4",
          }
        }
      },
    })
  )
}else if(process.env.NODE_ENV === "production") {
  providers.push(
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
    })
  )
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // You can specify which fields should be submitted, by adding keys to the `credentials` object.
  // e.g. domain, username, password, 2FA token, etc.
  credentials: {
    email: {},
    password: {},
  },
  providers
});
