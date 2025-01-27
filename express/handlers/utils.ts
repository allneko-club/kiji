import { decode, JWT } from '@auth/core/jwt';
import { prisma } from '@/express/prisma';

interface MyJWT extends JWT {
  id: string,
  role: number,
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

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
    });

    if (!user) {
      return { user: null, error: 'Unauthorized' };
    }

    return { user: user, error: undefined };
  } catch (error) {
    console.error(error);
    return { user: null, error: 'Unauthorized' };
  }
}
