import {
  randUserName,
  randEmail,
  randParagraph,
  randUuid,
} from '@ngneat/falso';
import { hash } from './mocks/utils';

const generateUser = () => ({
  id: randUuid() + Math.random(),
  name: randUserName({ withAccents: false }),
  email: randEmail(),
  password: hash("password"),
  role: 'ADMIN',
  bio: randParagraph(),
  createdAt: Date.now(),
});

export const createUser = <T extends Partial<ReturnType<typeof generateUser>>>(
  overrides?: T,
) => {
  return { ...generateUser(), ...overrides };
};
