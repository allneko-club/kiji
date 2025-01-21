import auth from '@/__mocks__/handlers/auth';
import contact from '@/__mocks__/handlers/contact';
import users from '@/__mocks__/handlers/users';
import posts from '@/__mocks__/handlers/posts';
import healthcheck from '@/__mocks__/handlers/healthcheck';

export const handlers = [
  auth,
  contact,
  healthcheck,
  users,
  posts,
];
