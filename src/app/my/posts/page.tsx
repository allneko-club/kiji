import { PostList } from '@/app/my/posts/_components/post-list';
import { auth } from '@/auth';
import Link from 'next/link';
import { paths } from '@/config/paths';
import { Button } from '@/components/ui/button';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/react-query';
import { postsOptions, PostsSearchParams } from '@/hooks/posts/post';

export default async function Page() {
  const session = await auth()
  if (!session?.user) return null

  const params: PostsSearchParams = { page:1, perPage: 100, sort:'id', myPosts: true }
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(postsOptions(params))

  return (<>
    <div className="flex items-center space-x-3">
      <h1>投稿</h1>
      <Link href={paths.my.createPost.getHref()}>
        <Button>Add</Button>
      </Link>
    </div>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostList params={params} />
    </HydrationBoundary>
  </>);
};
