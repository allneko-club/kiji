
export const UserRole = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export const POSTS_LIMIT = 10
export const USERS_LIMIT = 10
