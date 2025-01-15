/**
 * クエリパラメーターや、フォームの値をクリーンする機能を定義するためのファイル
 */

import { UserRole } from '@/config/consts';
import { z } from 'zod';
import { getFormattedDateFromDateObj } from '@/lib/datetime';

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
 * @param defaultValue
 */
export const cleanPerPage = (perPage: number | string | undefined | null, defaultValue: number) => {
  if(!perPage){
    return defaultValue;
  }

  // 100件を上限とする（仮
  const MAX = 100;
  const result = Number(perPage)
  return 1 < result && result <= MAX ? result : defaultValue;
 }

export const cleanUserRole = (role: string | undefined) => {
  if(role === UserRole.ADMIN || role === UserRole.USER){
    return role
  } else {
    return undefined
  }
}

export function updateQueryParams<T extends z.ZodTypeAny>(params: URLSearchParams, data: z.infer<T>) {

  for (const [key, value] of Object.entries(data)) {
    if (!value) {
      params.delete(key);
      continue;
    }

    if (value instanceof Date) {
      params.set(key, getFormattedDateFromDateObj(value));
    } else if (typeof value === 'number') {
      params.set(key, value.toString());
    } else if (typeof value === 'string') {
      params.set(key, value);
    }
  }

  const search = params.toString();
  return search ? `?${search}` : '';
}