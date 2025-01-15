import { RequestParams } from '@/lib/api-client';

export type IdParams = {
  id: string
}

export interface BaseSearch extends RequestParams {
  perPage: number,
  page: number,
}

export type BaseListRequestBody = {
  page?: number;
  perPage?: number;
  sort?: string;
};
export type BaseListResponseBody = {
  page: number;
  total: number;
  totalPages: number;
};

export type ErrorResponseBody = Record<'message', string>;
export type DeleteResponseBody = Record<'message', string>;