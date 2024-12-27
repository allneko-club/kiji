import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { api, RequestOptions } from '@/lib/api-client';
import { BaseSearch, User } from '@/types/api';


export const adminUsersOptions = (params: BaseSearch) => {
  // todo asよりベターな変換方法あるか？
  const options = {params} as RequestOptions;
  return  queryOptions({
    queryKey: ['admin', 'users', params],
    queryFn: async () => {
      return await api.get('/admin/users', options);
    },
  })
}

export const useAdminUsers = (params: BaseSearch) => {
  return useSuspenseQuery(adminUsersOptions(params))
}

const getAdminUserById = async (id: string): Promise<User> => {
  return await api.get<User>(`/admin/users/${id}`);
}

export const adminUserOptions = (id: string) => {
  return queryOptions({
    queryKey: ['admin', 'user', id],
    queryFn: () => getAdminUserById(id),
  })
}

export const useAdminUser = (id: string) => useSuspenseQuery(adminUserOptions(id))
