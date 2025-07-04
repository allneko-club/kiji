'use server';

import { actionClient } from '@/lib/action-client';
import { ZContact } from '@/types/contact';

export const contact = actionClient.inputSchema(ZContact).action(async ({ parsedInput }) => {
  return parsedInput;
});
