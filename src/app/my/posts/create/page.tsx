import type { Metadata } from 'next';
import { PostForm } from '@/app/my/posts/_components/post-form';
import { getCategories } from '@/models/category';


export const metadata: Metadata = {title: "記事作成"};

export default async function Page() {
  const categories = await getCategories()
  const initialState = {
    id: '',
    title: '',
    content: '',
    published: '',
    categoryId: '1',
  }

  return (
    <PostForm initialState={initialState} categories={categories} />
  );
};
