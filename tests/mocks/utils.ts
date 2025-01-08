import { delay, HttpResponse } from 'msw';
import { decode,  type JWT } from '@auth/core/jwt'
import { db } from './db';

interface MyJWT extends JWT {
  id: string,
  role: 'ADMIN' | 'USER'
}

export const hash = (str: string) => {
  let hash = 5381,
    i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return String(hash >>> 0);
};

export const networkDelay = () => {
  const delayTime = process.env.TEST ? 200 : 800;
  return delay(delayTime);
};

const omit = <T extends object>(obj: T, keys: string[]): T => {
  const result = {} as T;
  for (const key in obj) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }

  return result;
};

export const sanitizeUser = <O extends object>(user: O) =>
  omit<O>(user, ['password', 'iat']);

export async function requireAuth(cookies: Record<string, string>) {
  try {
    const token = cookies['authjs.session-token'];
    // Auth.js の仕様により salt は固定値。変更方法不明
    const salt = process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token";
    const decodedToken = await decode(
      {
        token: token,
        secret: process.env.AUTH_SECRET,
        salt: salt,
      }) as MyJWT;

    if (!decodedToken) {
      return { error: 'Unauthorized', user: null };
    }

    const user = db.user.findFirst({
      where: {
        id: {
          equals: decodedToken.id,
        },
      },
    });

    if (!user) {
      return { error: 'Unauthorized', user: null };
    }

    return { user: sanitizeUser(user) };
  } catch (error) {
    console.log(error)
    return { error: 'Unauthorized', user: null };
  }
}

export function requireAdmin(user: any) {
  if (user.role !== 'ADMIN') {
    throw Error('Unauthorized');
  }
}

export const getServerErrorResponse = (message = 'Server Error', status = 500) => HttpResponse.json(
  message,
  { status: status },
);