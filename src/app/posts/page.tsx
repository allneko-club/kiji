import { PostList } from '@/app/posts/_components/post-list';
import { postsOptions, PostsSearchParams } from '@/hooks/posts/post';
import { OrderBy } from '@/config/consts';
import { getQueryClient } from '@/lib/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

type SearchParams ={
  page?: string;
  orderBy?: OrderBy;
}

export default async function Page(props: {
  searchParams?: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const orderBy = searchParams?.orderBy || OrderBy.ASC;
  const params: PostsSearchParams = { perPage: 100, page, order:'id', orderBy, isPublic: true }
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(postsOptions(params))

  return (<>
    <h1 className="text-2xl">投稿</h1>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostList params={params} />
    </HydrationBoundary>
  </>);
};
