import { PostList } from '@/app/_components/post-list';
import { getPosts } from '@/services/posts/model';

type SearchParams ={
  page?: string;
  sort?: string;
}

export default async function Page(props: {
  searchParams?: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const params = { perPage: 100, page, sort: '-published', published: true }
  const {posts, total} = await getPosts(params)

  return (<>
    <h1>新着記事</h1>
    <PostList params={params} posts={posts} total={total} />
  </>);
};
