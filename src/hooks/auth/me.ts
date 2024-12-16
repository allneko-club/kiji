import { queryOptions, useQuery } from '@tanstack/react-query';
import { User } from '@/types/api';
import { api } from '@/lib/api-client';

export const getMe = async (): Promise<User> => {
  const response = (await api.get('/auth/me')) as { data: User };
  return response.data;
};

const userQueryKey = ['me'];

export const getMeQueryOptions = () => {
  return queryOptions({
    queryKey: userQueryKey,
    queryFn: getMe,
  });
};

export const useMe = () => useQuery(getMeQueryOptions());