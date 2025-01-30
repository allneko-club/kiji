import { Suspense } from 'react';
import { PostList, Search } from '@/app/_components';
import { getPosts } from '@/services/posts/model';

type SearchParams ={
  page?: string;
  query?: string;
}

export default async function Page(props: {
  searchParams?: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const query = searchParams?.query;
  const params = { perPage: 100, page, title: query, sort: '-published', published: true }
  const {posts, total} = await getPosts(params)

  return (<>
    <h1>新着記事</h1>
    <div className="py-4">
      <Suspense>
        <Search />
      </Suspense>
    </div>
    <PostList perPage={params.perPage} posts={posts} total={total} />
  </>);
};
