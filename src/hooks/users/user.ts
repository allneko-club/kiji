import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { api, RequestOptions } from '@/lib/api-client';
import { GetUsersResponseBody } from '@/__mocks__/handlers/users';
import { UserRoleType } from '@/config/consts';
import { User } from '@/types/api/users';
import { BaseSearch } from '@/types/api';

export interface UsersQueryParams extends BaseSearch {
  id?: string;
  sort?: string;
  name?: string,
  email?: string,
  role?: UserRoleType,
  registeredFrom?: string,
  registeredTo?: string,
}

export const usersOptions = (params: UsersQueryParams) => {
  // todo asよりベターな変換方法あるか？
  const options = {params} as RequestOptions;
  return  queryOptions({
    queryKey: ['users', params],
    queryFn: async () => {
      return await api.get<GetUsersResponseBody>('/users', options);
    },
  })
}

export const useUsers = (params: UsersQueryParams) => {
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
