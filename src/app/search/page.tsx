import { Suspense } from 'react';
import { Search } from '@/app/_components';
import { PostList } from '@/components/posts';
import { getPosts } from '@/services/posts/model';
import { getTags } from '@/services/tags/model';
import TagBadge from '@/components/tag-badge';
import * as React from 'react';
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
  const query = searchParams?.query;
  const params = { perPage: POST_LIMIT, page, title: query, sort: '-published', published: true }
  const {posts, total} = await getPosts(params)
  const {tags} = await getTags()

  return (<>
    <div className="py-4">
      <Suspense>
        <Search />
      </Suspense>
    </div>
    <div className="space-x-2">
      {tags.map((tag) => <TagBadge key={tag.id} name={tag.name} />)}
    </div>
    <PostList perPage={params.perPage} posts={posts} total={total} />
  </>);
};
