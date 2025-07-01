import 'server-only';
import { env } from './env';

// URLs
export const WEBAPP_URL = env.NEXT_PUBLIC_URL || 'http://localhost:3000';
export const SITE_NAME = 'kiji';
export const SITE_DESCRIPTION = 'Next.jsで作成したCMSアプリケーション';

export const POST_LIMIT = 20;

export const IS_PRODUCTION = env.NODE_ENV === 'production';
export const IS_DEVELOPMENT = env.NODE_ENV === 'development';
export const DEBUG = env.DEBUG === '1';

export const SESSION_MAX_AGE = 604800; // 24h x 7

export const SMTP_HOST = env.SMTP_HOST;
export const SMTP_PORT = env.SMTP_PORT;
export const SMTP_SECURE_ENABLED = env.SMTP_SECURE_ENABLED === '1' || env.SMTP_PORT === '465';
export const SMTP_USER = env.SMTP_USER;
export const SMTP_PASSWORD = env.SMTP_PASSWORD;
export const SMTP_REJECT_UNAUTHORIZED_TLS = env.SMTP_REJECT_UNAUTHORIZED_TLS !== '0';
export const MAIL_FROM = env.MAIL_FROM;
export const MAIL_FROM_NAME = env.MAIL_FROM_NAME;
