import type { Metadata } from 'next';
import { getCategories } from '@/models/category';
import { getTags } from '@/models/tag';
import { getUsers } from '@/models/user';
import { PostForm } from '@/app/admin/posts/_components/post-form';


export const metadata: Metadata = { title: '記事の作成' };

export default async function Page() {
  const categories = await getCategories();
  const tags = await getTags();
  const users = await getUsers();

  return (
    <PostForm categories={categories} tags={tags} users={users} />
  );
};
