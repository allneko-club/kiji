import type { Metadata } from 'next';
import { PostForm } from '@/app/admin/posts/_components/post-form';
import { getCategories } from '@/models/category';
import { getTags } from '@/models/tag';


export const metadata: Metadata = { title: '記事の作成' };

export default async function Page() {
  const categories = await getCategories();
  const tags = await getTags();
  const initialState = {
    id: '',
    title: '',
    content: '',
    published: '',
    categoryId: '1',
    tagIds: [],
  };

  return (
    <PostForm initialState={initialState} categories={categories} tags={tags} />
  );
};
