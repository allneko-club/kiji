import { Role } from '@/lib/users';

export const cleanOrder = (order: string | null | undefined) => {
  if (order === 'name') {
    return 'name';
  } else if (order === 'registered') {
    return 'registered';
  } else {
    return 'registered';
  }
};

export const cleanRole = (role: number | undefined): number | undefined => {
  if (Object(Role).values().includes(role)) {
    return role;
  } else {
    return undefined;
  }
};
