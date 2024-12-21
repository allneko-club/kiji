import { OrderBy } from '@/config/consts';

export type IdParams = {
  id: string
}

export type ListParams = {
  page?: number;
  perPage?: number;
  order?: OrderBy;
  orderBy?: string;
};

export type EmptyObject = {[key: string]: never}
