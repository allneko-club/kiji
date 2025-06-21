// ユーザーの権限
export const Role = {
  ADMIN: 0,
  USER: 1,
} as const;
export type Role = (typeof Role)[keyof typeof Role];
export const RoleFilterValues = ['0', '1'] as const;
export type RoleFilterValues = (typeof RoleFilterValues)[number];

export function getRoleLabel(role: number) {
  switch (role) {
    case Role.ADMIN:
      return '管理者';
    case Role.USER:
      return '一般';
  }
}
