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

export const cleanRole = (role: number | undefined): string => {
  switch (role) {
    case Role.ADMIN:
      return '0';
    case Role.USER:
      return '1';
    default:
      return '';
  }
};
