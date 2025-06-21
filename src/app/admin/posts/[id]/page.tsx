import { PostForm } from '@/app/admin/posts/_components/post-form';
import { auth } from '@/auth';
import { getCategories } from '@/models/category';
import { getPost } from '@/models/post';
import { getTags } from '@/models/tag';
import { getUsers } from '@/models/user';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = { title: '投稿の編集' };

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const session = await auth();

  if (!session?.user) return null;

  const categories = await getCategories();
  const tags = await getTags();
  const users = await getUsers();
  const id = (await params).id;
  const post = await getPost(id);
  const userId = session.user.id;

  if (!post || post.author.id !== userId) {
    notFound();
  }

  const post_ = {
    id: id,
    title: post.title,
    content: post.content,
    published: post.published,
    authorId: post.authorId,
    categoryId: post.categoryId,
    tagIds: post.tags.map((tag) => tag.id),
  };

  return <PostForm categories={categories} tags={tags} users={users} post={post_} />;
}
