import 'server-only';
import { env } from './env';

// ユーザー一覧の表示件数のリスト 要素は1つ以上
export const USERS_LIMIT_LIST = [10, 25, 50];
export const POST_LIMIT = 20;
export const DEFAULT_CATEGORY_ID = 1;

export const IS_PRODUCTION = env.NODE_ENV === 'production';
export const IS_DEVELOPMENT = env.NODE_ENV === 'development';
export const DEBUG = env.DEBUG === '1';

export const SESSION_MAX_AGE = 604800; // 24h x 7
