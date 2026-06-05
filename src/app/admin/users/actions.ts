'use server';

import { adminActionClient } from '@/lib/action-client';
import { ZCuid } from '@/types/common';
import { ZUpdateUser } from '@/types/user';
import { z } from 'zod';

export const updateUser = adminActionClient.inputSchema(ZUpdateUser).action(async ({ parsedInput }) => {
  return { id: 1, name: 'tom', email: 'tom@example.com' };
});

const ZDeleteUser = z.object({ id: ZCuid });

export const deleteUser = adminActionClient.inputSchema(ZDeleteUser).action(async ({ parsedInput }) => {
  return true;
});
