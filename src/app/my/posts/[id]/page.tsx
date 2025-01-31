import { auth } from '@/auth';
import { getPost } from '@/models/post';
import { notFound } from 'next/navigation';
import { PostForm } from '@/app/my/posts/_components/post-form';
import { getCategories } from '@/models/category';

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const session = await auth()

  if (!session?.user) return null

  const categories = await getCategories()
  const id = (await params).id
  const post = await getPost(id);
  const userId = session.user.id

  if(!post || post.author.id !== userId){
    notFound()
  }

  const initialState = {
    id: id,
    title: post.title,
    content: post.content,
    published: post.published ? 'on' : '',
    categoryId: post.categoryId.toString(),
  }

  return (
    <PostForm initialState={initialState} categories={categories} />
  );
};
