import NextLink from 'next/link'
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { auth } from '@/auth';
import { getPosts } from '@/models/post';
import { paths } from '@/config/paths';
import { PostsTable } from '@/app/my/_components/posts-table';
import { POST_LIMIT } from '@/config/consts';

export default async function Page() {
  const session = await auth()

  if (!session?.user) return null

  const params = { page:1, perPage: POST_LIMIT, authorId: session.user.id }
  const {posts, total} = await getPosts(params)

  return (
    <div>
      <div>
        <Typography component="h1" variant="h3">投稿</Typography>
        <Link href={paths.my.createPost.getHref()} component={NextLink}>追加</Link>
      </div>
      <PostsTable posts={posts} total={total} perPage={100}/>
    </div>
  );
};
