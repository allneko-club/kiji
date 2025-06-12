import NextLink from 'next/link';
import Typography from '@mui/material/Typography';
import { auth } from '@/auth';
import { getPosts } from '@/models/post';
import { paths } from '@/config/paths';
import { PostsTable } from '@/app/admin/posts/_components/posts-table';
import { POST_LIMIT } from '@/config/consts';
import Button from '@mui/material/Button';

export default async function Page() {
  const session = await auth();

  if (!session?.user) return null;

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
};
