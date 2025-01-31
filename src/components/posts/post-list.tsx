'use client';
import { PaginationBasic } from '@/components/pagination-basic';
import { PostCard } from '@/components/posts';
import { Post } from '@prisma/client';

type Props = {
  perPage: number;
  posts: Post[];
  total: number;
}

export const PostList = ({ perPage, posts, total }: Props) => {

  return (<>
    <div className="grid gap-3 sm:grid-cols-2">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>

    <PaginationBasic perPage={perPage} total={total} />
  </>);
};