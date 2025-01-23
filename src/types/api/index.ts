import { RequestParams } from '@/lib/api-client';


export interface BaseSearch extends RequestParams {
  id?: number | string;
  perPage: number;
  page: number;
}
