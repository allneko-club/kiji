import { decode, JWT } from '@auth/core/jwt';
import { UserRole } from '@/config/consts';
import { db } from '@/__mocks__/db';
import { sanitizeUser } from '@/__mocks__/utils';

interface MyJWT extends JWT {
  id: string,
  role: UserRole,
}

export async function requireAuth(cookies: Record<string, string>) {
  try {
    const token = cookies['authjs.session-token'];
    // Auth.js の仕様により salt は固定値。変更方法不明
    const salt = process.env.NODE_ENV === 'production'
      ? '__Secure-authjs.session-token'
      : 'authjs.session-token';
    const decodedToken = await decode(
      {
        token: token,
        secret: process.env.AUTH_SECRET || '',
        salt: salt,
      }) as MyJWT;

    if (!decodedToken) {
      return { user: null, error: 'Unauthorized' };
    }

    const user = db.user.findFirst({
      where: {
        id: {
          equals: decodedToken.id,
        },
      },
    });

    if (!user) {
      return { user: null, error: 'Unauthorized' };
    }

    return { user: sanitizeUser(user), error: undefined };
  } catch (error) {
    console.error(error);
    return { user: null, error: 'Unauthorized' };
  }
}

export async function requireAuthAdmin(cookies: Record<string, string>) {
  const { user, error } = await requireAuth(cookies);

  if (error || !user || user.role !== UserRole.ADMIN) {
    return { user: null, error: 'Unauthorized' };
  }

  return { user: sanitizeUser(user), error: undefined };
}