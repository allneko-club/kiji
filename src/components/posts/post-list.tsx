'use client';
import { PaginationBasic } from '@/components/pagination-basic';
import { PostCard } from '@/components/posts';
import Grid from '@mui/material/Grid';
import { PostWithCategoryAuthor } from '@/types/post';

type Props = {
  perPage: number;
  posts: PostWithCategoryAuthor[];
  total: number;
}

export const PostList = ({ perPage, posts, total }: Props) => {

  return (<>
    <Grid container spacing={2} columns={12}>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </Grid>

    <PaginationBasic perPage={perPage} total={total} />
  </>);
};