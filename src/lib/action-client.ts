import { auth } from '@/auth';
import {
  AuthenticationError,
  AuthorizationError,
  InvalidInputError,
  OperationNotAllowedError,
  ResourceNotFoundError,
  TooManyRequestsError,
  UnknownError,
} from '@/lib/errors';
import { logger } from '@/lib/logger';
import { Role } from '@/lib/roles';
import { getUser } from '@/models/user';
import { DEFAULT_SERVER_ERROR_MESSAGE, createSafeActionClient } from 'next-safe-action';

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (
      e instanceof ResourceNotFoundError ||
      e instanceof AuthorizationError ||
      e instanceof InvalidInputError ||
      e instanceof UnknownError ||
      e instanceof AuthenticationError ||
      e instanceof OperationNotAllowedError ||
      e instanceof TooManyRequestsError
    ) {
      return e.message;
    }

    logger.error(e, 'SERVER ERROR');
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const adminActionClient = actionClient.use(async ({ ctx, next }) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new AuthenticationError('Not authenticated');
  }

  const user = await getUser(userId);
  if (!user || user.role !== Role.ADMIN) {
    throw new AuthorizationError('User not found');
  }

  return next({ ctx: { ...ctx, user } });
});
