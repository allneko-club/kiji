import type { Metadata } from 'next';
import { PostForm } from '@/app/my/posts/_components/post-form';
import { getCategories } from '@/models/category';
import { getTags } from '@/models/tag';


export const metadata: Metadata = {title: "記事作成"};

export default async function Page() {
  const categories = await getCategories()
  const tags = await getTags()
  const initialState = {
    id: '',
    title: '',
    content: '',
    published: '',
    categoryId: '1',
    tags: [],
  }

  return (
    <PostForm initialState={initialState} categories={categories} tags={tags} />
  );
};
