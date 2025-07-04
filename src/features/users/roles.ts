// ユーザーの権限
export const Role = {
  ADMIN: 0,
  USER: 1,
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export function getRoleLabel(role: number) {
  switch (role) {
    case Role.ADMIN:
      return '管理者';
    case Role.USER:
      return '一般';
  }
}

export type Capability = 'manageOptions' | 'createUsers' | 'updateUsers' | 'deleteUsers' | 'listUsers';
