import { auth } from '@/auth';
import { getPosts } from '@/models/post';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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
      <div className="flex items-center space-x-3">
        <h1>投稿</h1>
        <Button asChild>
          <Link href={paths.my.createPost.getHref()}>追加</Link>
        </Button>
      </div>
      <PostsTable posts={posts} total={total} perPage={100}/>
    </div>
  );
};
