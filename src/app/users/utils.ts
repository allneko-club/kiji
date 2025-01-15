interface UserSortItems {
  [key: string]: string;
}

export const UserSortItems: UserSortItems = {
  'registered': '登録日(昇順)',
  '-registered': '登録日(降順)',
  'name': '名前(昇順)',
  '-name': '名前(降順)',
} as const;
export const UserSortItemsValues = Object.keys(UserSortItems);

export const cleanSortParam = (sort: string = '-registered') =>
  UserSortItemsValues.some((v) => v === sort) ? sort : '-registered';