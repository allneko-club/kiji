import { PostList } from '@/app/posts/_components/post-list';
import { postsOptions, PostsSearchParams } from '@/hooks/posts/post';
import { OrderBy } from '@/config/consts';
import { getQueryClient } from '@/lib/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Page() {
  const params: PostsSearchParams = { perPage: 100, order: 'id', orderBy: OrderBy.DESC, isPublic: true }
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(postsOptions(params))

  return (<>
    <h1 className="text-xl">投稿</h1>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostList params={params} />
    </HydrationBoundary>
  </>);
};
