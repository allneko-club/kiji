'use client'
import { PaginationBasic } from '@/components/pagination-basic';
import { PostCard } from '@/app/my/posts/_components/post-card';
import { Post } from '@prisma/client';

export const PostList = ({posts, total}: { posts: Post[]; total: number; }) => {
  const perPage = 10
  return (<>
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>

    <PaginationBasic perPage={perPage} totalPages={total} />
  </>);
};