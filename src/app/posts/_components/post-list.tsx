'use client'
import { PaginationBasic } from '@/components/pagination-basic';
import { PostCard } from '@/app/posts/_components/post-card';
import { PostsSearchParams, usePosts } from '@/hooks/posts/post';

export const PostList = ({params}: { params: PostsSearchParams; }) => {
  const { data } = usePosts(params)
  return (<>
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {data.posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>

    <PaginationBasic perPage={data.perPage} totalPages={data.total} />
  </>);
};