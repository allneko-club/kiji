import { PostList } from '@/components/posts';
import { getPosts } from '@/models/post';
import { POST_LIMIT } from '@/config/consts';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Search } from '@/app/posts/search';
import { getTags } from '@/models/tag';
import type { Metadata } from 'next';
import TagChip from '@/components/ui/tag-chip';
import { paths } from '@/config/paths';

export const metadata: Metadata = { title: '記事一覧' };

type SearchParams = {
  page?: string;
  query?: string;
}

export default async function Page(props: {
  searchParams?: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const query = searchParams?.query;
  const params = { perPage: POST_LIMIT, page, title: query, published: true };
  const { posts, total } = await getPosts(params);
  const tags = await getTags();

  return (
    <>
      <Typography variant="h1">投稿</Typography>
      <Typography>新着の投稿順</Typography>

      <div>
        <Search />
      </div>
      <div>
        {tags.map((tag) =>
          <TagChip
            key={tag.id}
            label={tag.name}
            href={paths.tags.detail.getHref(tag.slug)}
          />
        )}
      </div>
      <PostList perPage={params.perPage} posts={posts} total={total} />
    </>
  );
};
