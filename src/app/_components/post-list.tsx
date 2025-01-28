'use client'
import { PaginationBasic } from '@/components/pagination-basic';
import { PostCard } from '@/app/_components/post-card';
import { Post } from '@prisma/client';
import { BaseSearch } from '@/types/requests';

interface PostsSearchParams extends BaseSearch{
  myPosts?: boolean,
  isPublic?: boolean,
}

export const PostList = ({params, posts, total}: { params: PostsSearchParams; posts: Post[]; total: number }) => {

  return (<>
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>

    <PaginationBasic perPage={params.perPage} totalPages={total} />
  </>);
};