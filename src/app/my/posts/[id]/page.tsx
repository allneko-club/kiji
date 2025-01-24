import { UpdatePostForm } from '@/app/my/posts/[id]/_components/update-post-form';
import { auth } from '@/auth';
import { getPost } from '@/services/posts/model';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const session = await auth()

  if (!session?.user) return null

  const id = (await params).id
  const post = await getPost(id);
  const userId = Number(session.user.id)

  if(!post || post.author.id !== userId){
    notFound()
  }

  return (
    <UpdatePostForm id={id} post={post} />
  );
};
