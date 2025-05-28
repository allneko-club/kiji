import { paths } from '@/config/paths';

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
      return "管理者";
    case Role.USER:
      return "一般";
  }
}

// ユーザー一覧の表示件数のリスト 要素は1つ以上
export const USERS_LIMIT_LIST = [10, 25, 50]
export const POST_LIMIT = 20

// ヘッダーのメニューに表示するリンク
export const mainMenu = [
  { href: paths.home.getHref(), label: 'home' },
  { href: paths.posts.getHref(), label: 'posts' },
  { href: paths.users.getHref(), label: 'users' },
];