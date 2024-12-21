import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { api, RequestOptions } from '@/lib/api-client';
import { BaseSearch, Post } from '@/types/api';

export interface PostsSearchParams extends BaseSearch{
  myPosts?: boolean,
  isPublic?: boolean,
}

export const postsOptions = (params: PostsSearchParams) => {

  const options = {params} as RequestOptions;
  return  queryOptions({
    queryKey: ['posts', params],
    queryFn: async () => {
      return await api.get('/posts', options);
    },
  })
}

export const usePosts = (params: PostsSearchParams) => {
  return useSuspenseQuery(postsOptions(params))
}

const getPostById = async (id: string, isPublic=null): Promise<Post> => {
  let url = `/posts/${id}`
  if(typeof isPublic === "boolean"){
    url = isPublic ? `/posts/${id}?isPublic=true` : `/posts/${id}?isPublic=false`
  }
  return await api.get<Post>(url);

}

export const postOptions = (id: string) => {
  return queryOptions({
    queryKey: ['post', id],
    queryFn: () => getPostById(id),
  })
}

export const usePost = (id: string) => useSuspenseQuery(postOptions(id))

export const publicPostOptions = (id: string) => {
  return queryOptions({
    queryKey: ['post', 'public', id],
    queryFn: () => getPostById(id, true),
  })
}

export const usePublicPost = (id: string) => useSuspenseQuery(publicPostOptions(id))
