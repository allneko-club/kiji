import { OrderBy } from '@/config/consts';

export type IdParams = {
  id: string
}

export type BaseListRequestBody = {
  page?: number;
  perPage?: number;
  order?: OrderBy;
  orderBy?: string;
};

export type BaseListResponseBody = {
  page: number;
  total: number;
  totalPages: number;
};

export type ErrorResponseBody = Record<"message", string>;

export type DeleteResponseBody = Record<"message", string>;

export type EmptyObject = {[key: string]: never}
