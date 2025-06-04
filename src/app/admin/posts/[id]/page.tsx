import { auth } from '@/auth';
import { getPost } from '@/models/post';
import { notFound } from 'next/navigation';
import { PostForm } from '@/app/admin/posts/_components/post-form';
import { getCategories } from '@/models/category';
import { getTags } from '@/models/tag';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = { title: "記事の編集" };

export default async function Page({ params }: Props) {
  const session = await auth()

  if (!session?.user) return null

  const categories = await getCategories()
  const tags = await getTags()
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
    tagIds: post.tags.map(tag => tag.id),
  }

  return (
    <PostForm initialState={initialState} categories={categories} tags={tags} />
  );
};
