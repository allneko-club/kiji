export interface BaseSearch {
  id?: number | string;
  page: number;
  perPage: number;
  order?: string;
  orderBy?: string;
}