import {
  randUserName,
  randEmail,
  randParagraph,
  randUuid,
  randCatchPhrase,
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

const generatePost = () => ({
  id: randUuid(),
  title: randCatchPhrase(),
  body: randParagraph(),
  createdAt: Date.now(),
  public: true,
});

export const createPost = <
  T extends Partial<ReturnType<typeof generatePost>>,
>(
  overrides?: T & { authorId?: string; },
) => {
  return { ...generatePost(), ...overrides };
};