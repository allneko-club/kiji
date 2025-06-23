import { PostsTable } from '@/app/admin/posts/_components/posts-table';
import { paths } from '@/config/paths';
import { POST_LIMIT } from '@/lib/consts';
import { getPosts } from '@/models/post';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';

export default async function Page() {
  const params = { page: 1, perPage: POST_LIMIT };
  const { posts, total } = await getPosts(params);

  return (
    <div>
      <div>
        <Typography variant="h1">投稿</Typography>
        <Button variant="contained" component={NextLink} href={paths.admin.posts.create.getHref()}>
          追加
        </Button>
      </div>
      <PostsTable posts={posts} total={total} perPage={100} />
    </div>
  );
}
