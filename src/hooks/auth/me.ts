import { queryOptions, useQuery } from '@tanstack/react-query';
import { User } from '@/types/api';
import { api } from '@/lib/api-client';

export const getMe = async (): Promise<User> => {
  return  api.get('/auth/me');
};

const userQueryKey = ['me'];

export const getMeQueryOptions = () => {
  return queryOptions({
    queryKey: userQueryKey,
    queryFn: getMe,
  });
};

export const useMe = () => useQuery(getMeQueryOptions());