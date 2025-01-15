import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { api, RequestOptions } from '@/lib/api-client';
import { BaseSearch, User } from '@/types/api';
import { GetUsersResponseBody } from '@/__mocks__/handlers/users';


export const usersOptions = (params: BaseSearch) => {
  // todo asよりベターな変換方法あるか？
  const options = {params} as RequestOptions;
  return  queryOptions({
    queryKey: ['users', params],
    queryFn: async () => {
      return await api.get<GetUsersResponseBody>('/users', options);
    },
  })
}

export const useUsers = (params: BaseSearch) => {
  return useSuspenseQuery(usersOptions(params))
}

const getUserById = async (id: string): Promise<User> => {
  return await api.get<User>(`/users/${id}`);
}

export const userOptions = (id: string) => {
  return queryOptions({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
  })
}

export const useUser = (id: string) => useSuspenseQuery(userOptions(id))
