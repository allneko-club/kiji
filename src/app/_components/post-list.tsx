'use client';
import { PaginationBasic } from '@/components/pagination-basic';
import { PostCard } from '@/app/_components';
import { Post } from '@prisma/client';

type Props = {
  perPage: number;
  posts: Post[];
  total: number;
}

export const PostList = ({ perPage, posts, total }: Props) => {

  return (<>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>

    <PaginationBasic perPage={perPage} totalPages={total} />
  </>);
};