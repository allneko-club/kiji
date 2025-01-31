import { PostList } from '@/components/posts';
import { getPosts } from '@/models/post';
import { POST_LIMIT } from '@/config/consts';

type SearchParams ={
  page?: string;
  query?: string;
}

export default async function Page(props: {
  searchParams?: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const params = { perPage: POST_LIMIT, page, published: true }
  const {posts, total} = await getPosts(params)

  return (<>
    <h1>新着</h1>
    <PostList perPage={params.perPage} posts={posts} total={total} />
  </>);
};
