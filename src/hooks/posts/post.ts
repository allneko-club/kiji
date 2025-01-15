import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { GetPostsResponseBody } from '@/__mocks__/handlers/posts';
import { Post } from '@/types/api/posts';
import { BaseSearch } from '@/types/api';

export interface PostsSearchParams extends BaseSearch{
  myPosts?: boolean,
  isPublic?: boolean,
}

export const postsOptions = (params: PostsSearchParams) => {
  return  queryOptions({
    queryKey: ['posts', params],
    queryFn: async () => {
      return await api.get<GetPostsResponseBody>('/posts', {params});
    },
  })
}

export const usePosts = (params: PostsSearchParams) => {
  return useSuspenseQuery(postsOptions(params))
}

const getPostById = async (id: string, isPublic: boolean | undefined): Promise<Post> => {
  let url = `/posts/${id}`
  if(typeof isPublic === "boolean"){
    url = isPublic ? `/posts/${id}?isPublic=true` : `/posts/${id}?isPublic=false`
  }
  return await api.get<Post>(url);

}

export const postOptions = (id: string, isPublic: boolean | undefined) => {
  return queryOptions({
    queryKey: ['post', id, isPublic],
    queryFn: () => getPostById(id, isPublic),
  })
}

export const usePost = (id: string, isPublic: boolean | undefined) => useSuspenseQuery(postOptions(id, isPublic))

export const publicPostOptions = (id: string) => {
  return queryOptions({
    queryKey: ['post', 'public', id],
    queryFn: () => getPostById(id, true),
  })
}

export const usePublicPost = (id: string) => useSuspenseQuery(publicPostOptions(id))
