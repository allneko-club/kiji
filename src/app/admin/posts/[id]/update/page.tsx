import { PostForm } from '@/app/admin/posts/_components/post-form';
import { getCategories } from '@/features/posts/models/category';
import { getPostById } from '@/features/posts/models/post';
import { getTags } from '@/features/posts/models/tag';
import { getUsers } from '@/features/users/models/user';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = { title: '投稿の編集' };

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const id = (await params).id;

  const post = await getPostById(id);
  if (!post) {
    notFound();
  }
  const postFixed = {
    ...post,
    tagIds: post.tags.map((tag) => tag.id),
  };

  const categories = await getCategories();
  const tags = await getTags();
  const users = await getUsers();

  return (
    <>
      <Typography variant="h1">投稿の編集</Typography>
      <PostForm categories={categories} tags={tags} users={users} post={postFixed} />
    </>
  );
}
