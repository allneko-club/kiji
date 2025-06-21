import { PostForm } from '@/app/admin/posts/_components/post-form';
import { getCategories } from '@/models/category';
import { getTags } from '@/models/tag';
import { getUsers } from '@/models/user';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '投稿の作成' };

export default async function Page() {
  const categories = await getCategories();
  const tags = await getTags();
  const users = await getUsers();

  return (
    <>
      <Typography variant="h1">投稿の作成</Typography>
      <PostForm categories={categories} tags={tags} users={users} />
    </>
  );
}
