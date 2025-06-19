/**
 * クエリパラメーターや、フォームの値をクリーンする機能を定義するためのファイル
 */
import { getFormattedDateFromObj } from '@/lib/datetime';
import { OrderBy } from '@/types/utils';
import { z } from 'zod';

/**
 * クエリパラメーターの page をクリーンする
 * @param page
 */
export const cleanPage = (page: number | string | undefined | null) => {
  const result = Number(page);
  return 1 < result ? result : 1;
};

/**
 * クエリパラメーターの perPage をクリーンする
 * @param perPage
 * @param values
 */
export const cleanPerPage = (perPage: number | string | undefined | null, values: number[]) => {
  if (!perPage || !values.includes(Number(perPage))) {
    return values[0];
  }

  return Number(perPage);
};

export const cleanOrderBy = (orderBy: string | null | undefined): OrderBy => {
  return orderBy === 'desc' ? 'desc' : 'asc';
};

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
