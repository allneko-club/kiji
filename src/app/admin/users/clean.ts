import { Role, RoleFilterValues } from '@/config/consts';

export const cleanOrder = (order: string | null | undefined) => {
  if (order === 'name') {
    return 'name';
  } else if (order === 'registered') {
    return 'registered';
  } else {
    return 'registered';
  }
};

// なぜかcleanRole()の戻り値がstringに推論されてしまうため明示的に定義する
type CleanRole = '' | RoleFilterValues;
export const cleanRole = (role: number | undefined): CleanRole => {
  switch (role) {
    case Role.ADMIN:
      return '0';
    case Role.USER:
      return '1';
    default:
      return '';
  }
};
