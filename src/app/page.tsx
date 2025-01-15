import { PostList } from '@/app/_components/post-list';
import { postsOptions, PostsSearchParams } from '@/hooks/posts/post';
import { getQueryClient } from '@/lib/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

type SearchParams ={
  page?: string;
  sort?: string;
}

export default async function Page(props: {
  searchParams?: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const params: PostsSearchParams = { perPage: 100, page, sort:'id', isPublic: true }
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(postsOptions(params))

  return (<>
    <h1>新着記事</h1>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostList params={params} />
    </HydrationBoundary>
  </>);
};
