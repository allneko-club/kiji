import { Order } from '@/config/consts';

export type IdParams = {
  id: string
}

export type ListParams = {
  page?: number;
  perPage?: number;
  order?: Order;
  orderBy?: string;
};

export type EmptyObject = {[key: string]: never}
