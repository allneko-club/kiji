'use server';

import { Role } from '@/features/users/roles';
import { actionClient } from '@/lib/action-client';
import { sendRegisteredEmail } from '@/lib/email';
import { hash } from '@/lib/utils';
import { ZRegister } from '@/types/user';

export const register = actionClient.inputSchema(ZRegister).action(async ({ parsedInput }) => {
  const created = {
    name: parsedInput.name,
    email: parsedInput.email,
    role: Role.USER,
    password: hash(parsedInput.password),
  };
  await sendRegisteredEmail({ email: parsedInput.email });
  return true;
});
