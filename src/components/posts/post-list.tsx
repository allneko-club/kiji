'use client';

import { PaginationBasic } from '@/components/pagination-basic';
import { PostCard } from '@/components/posts';
import { PostWithCategoryAuthor } from '@/types/post';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

type Props = {
  perPage: number;
  posts: PostWithCategoryAuthor[];
  total: number;
};

export const PostList = ({ perPage, posts, total }: Props) => {
  if (posts.length === 0) {
    return <Typography>投稿はありません。</Typography>;
  } else {
    return (
      <>
        <Grid container spacing={2} columns={12}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Grid>

        <PaginationBasic perPage={perPage} total={total} />
      </>
    );
  }
};
