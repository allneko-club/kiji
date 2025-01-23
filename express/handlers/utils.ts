import { decode } from '@auth/core/jwt';
import { Role } from '@/config/consts';
import { sanitizeUser } from '@/express/utils';
import { prisma } from '@/express/prisma';

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
      });

    if (!decodedToken) {
      return { user: null, error: 'Unauthorized' };
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(decodedToken.id),
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

  if (error || !user || user.role !== Role.ADMIN) {
    return { user: null, error: 'Unauthorized' };
  }

  return { user: sanitizeUser(user), error: undefined };
}