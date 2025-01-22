import auth from '@/express/handlers/auth';
import contact from '@/express/handlers/contact';
import users from '@/express/handlers/users';
import posts from '@/express/handlers/posts';
import healthcheck from '@/express/handlers/healthcheck';

export const handlers = [
  auth,
  contact,
  healthcheck,
  users,
  posts,
];
