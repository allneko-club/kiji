import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { User } from '@/types/api/users';

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