/**
 * クエリパラメーターや、フォームの値をクリーンする機能を定義するためのファイル
 */

import { Role, RoleFilterValues } from '@/config/consts';
import { z } from 'zod';
import { getFormattedDateFromObj } from '@/lib/datetime';

/**
 * クエリパラメーターの page をクリーンする
 * @param page
 */
export const cleanPage = (page: number | string | undefined | null) => {
  const result = Number(page)
  return 1 < result ? result : 1;
}

/**
 * クエリパラメーターの perPage をクリーンする
 * @param perPage
 * @param values
 */
export const cleanPerPage = (perPage: number | string | undefined | null, values: number[]) => {
  if(!perPage || !values.includes(Number(perPage))){
    return values[0];
  }

  return Number(perPage);
}

// なぜかcleanRole()の戻り値がstringに推論されてしまうため明示的に定義する
type CleanRole = '' | RoleFilterValues;
export const cleanRole = (role: number | undefined): CleanRole => {
  switch(role){
    case Role.ADMIN:
      return '0';
    case Role.USER:
      return '1';
    default:
      return '';
  }
}


export const cleanOrder = (order: string | null | undefined) => {
  if(order && ['name', 'registered'].includes(order)){
    return order;
  }else{
    return 'registered';
  }
}

export const cleanOrderBy = (orderBy: string | null | undefined) => {
  if(orderBy && ['asc', 'desc'].includes(orderBy)){
    return orderBy;
  }else{
    return 'desc';
  }
}

export function updateQueryParams<T extends z.ZodTypeAny>(params: URLSearchParams, data: z.infer<T>) {

  for (const [key, value] of Object.entries(data)) {
    if (!value) {
      params.delete(key);
      continue;
    }

    if (value instanceof Date) {
      params.set(key, getFormattedDateFromObj(value));
    } else if (typeof value === 'number') {
      params.set(key, value.toString());
    } else if (typeof value === 'string') {
      params.set(key, value);
    }
  }

  const search = params.toString();
  return search ? `?${search}` : '';
}

export const parseSortValue = (sort: string) => {
  if (!sort.length) {
    console.error('invalid sort value');
    return { order: 'registered', orderBy: 'desc' };
  }

  const orderBy = sort.endsWith('_asc') ? 'asc' : 'desc';
  const order = orderBy === 'asc' ? sort.slice(0, -4) : sort.slice(0, -5);
  return { order, orderBy };
};