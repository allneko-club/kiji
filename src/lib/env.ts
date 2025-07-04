import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DEBUG: z.enum(['1', '0']).optional(),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error', 'fatal']).optional(),
    MAIL_FROM: z.string().email().optional(),
    MAIL_FROM_NAME: z.string().optional(),
    AUTH_SECRET: z.string().optional(),
    NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
    SMTP_HOST: z.string().min(1).optional(),
    SMTP_PORT: z.string().min(1).optional(),
    SMTP_SECURE_ENABLED: z.enum(['1', '0']).optional(),
    SMTP_USER: z.string().min(1).optional(),
    SMTP_PASSWORD: z.string().min(1).optional(),
    SMTP_REJECT_UNAUTHORIZED_TLS: z.enum(['1', '0']).optional(),
  },
  client: {
    NEXT_PUBLIC_URL: z.string().url(),
    NEXT_PUBLIC_DEFAULT_CATEGORY_ID: z
      .string()
      .transform((s) => parseInt(s, 10))
      .pipe(z.number()),
    NEXT_PUBLIC_DATE_FORMAT: z.string(),
    NEXT_PUBLIC_TIME_FORMAT: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DEBUG: process.env.DEBUG,
    LOG_LEVEL: process.env.LOG_LEVEL,
    MAIL_FROM: process.env.MAIL_FROM,
    MAIL_FROM_NAME: process.env.MAIL_FROM_NAME,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE_ENABLED: process.env.SMTP_SECURE_ENABLED,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_REJECT_UNAUTHORIZED_TLS: process.env.SMTP_REJECT_UNAUTHORIZED_TLS,

    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_DEFAULT_CATEGORY_ID: process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID,
    NEXT_PUBLIC_DATE_FORMAT: process.env.NEXT_PUBLIC_DATE_FORMAT,
    NEXT_PUBLIC_TIME_FORMAT: process.env.NEXT_PUBLIC_TIME_FORMAT,
  },
});
