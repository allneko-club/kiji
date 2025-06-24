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
