'use client';
import { PaginationBasic } from '@/components/pagination-basic';
import { PostCard } from '@/components/posts';
import { Post } from '@prisma/client';
import Grid from '@mui/material/Grid';

type Props = {
  perPage: number;
  posts: Post[];
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