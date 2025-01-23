import { PostList } from '@/app/my/posts/_components/post-list';
import { auth } from '@/auth';
import Link from 'next/link';
import { paths } from '@/config/paths';
import { Button } from '@/components/ui/button';
import { getPosts } from '@/services/posts/model';

export default async function Page() {
  const session = await auth()
  if (!session?.user) return null

  const params = { page:1, perPage: 100, sort:'id', myPosts: true }
  const {posts, total} = await getPosts(params)

  return (<>
    <div className="flex items-center space-x-3">
      <h1>投稿</h1>
      <Link href={paths.my.createPost.getHref()}>
        <Button>Add</Button>
      </Link>
    </div>
    <PostList posts={posts} total={total} />
  </>);
};
