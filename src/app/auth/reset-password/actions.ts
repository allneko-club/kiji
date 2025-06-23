'use server';

import { actionClient } from '@/lib/action-client';
import { ZResetPassword } from '@/schemas/user';

export const resetPassword = actionClient.inputSchema(ZResetPassword).action(async ({ parsedInput }) => {
  return parsedInput;
});
