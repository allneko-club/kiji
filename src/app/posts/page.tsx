import { PostList } from '@/app/posts/_components/post-list';
import { postsOptions, PostsSearchParams } from '@/hooks/posts/post';
import { OrderBy } from '@/config/consts';
import { getQueryClient } from '@/lib/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { H1 } from '@/components/ui/header';

type SearchParams ={
  page?: string;
  orderBy?: OrderBy;
}

export default async function Page(props: {
  searchParams?: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const orderBy = searchParams?.orderBy || OrderBy.ASC;
  const params: PostsSearchParams = { perPage: 100, currentPage, order:'id', orderBy }
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(postsOptions(params))

  return (<>
    <H1>投稿</H1>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostList params={params} />
    </HydrationBoundary>
  </>);
};
