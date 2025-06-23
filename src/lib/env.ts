import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DEBUG: z.enum(['1', '0']).optional(),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error', 'fatal']).optional(),
    NEXTAUTH_SECRET: z.string().optional(),
    NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
  },
  client: {
    NEXT_PUBLIC_URL: z.string().url(),
    NEXT_PUBLIC_DEFAULT_CATEGORY_ID: z
      .string()
      .transform((s) => parseInt(s, 10))
      .pipe(z.number()),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DEBUG: process.env.DEBUG,
    LOG_LEVEL: process.env.LOG_LEVEL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_DEFAULT_CATEGORY_ID: process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID,
  },
});
