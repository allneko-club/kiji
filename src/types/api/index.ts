import { RequestParams } from '@/lib/api-client';


export interface BaseSearch extends RequestParams {
  perPage: number,
  page: number,
}
