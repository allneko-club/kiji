import { auth } from '@/auth';
import { getPosts } from '@/services/posts/model';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { paths } from '@/config/paths';
import { PostList } from '@/app/my/_components/post-list';

export default async function Page() {
  const session = await auth()

  if (!session?.user) return null

  const params = { page:1, perPage: 100, authorId: session.user.id }
  const {posts, total} = await getPosts(params)

  return (
    <div>
      <div className="flex items-center space-x-3">
        <h1>投稿</h1>
        <Button asChild>
          <Link href={paths.my.createPost.getHref()}>追加</Link>
        </Button>
      </div>
      <PostList posts={posts} total={total} />
    </div>
  );
};
