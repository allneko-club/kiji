import { RequestParams } from '@/lib/api-client';


export interface BaseSearch extends RequestParams {
  id?: number | string;
  page: number;
  perPage: number;
  order?: string;
  orderBy?: string;
}
