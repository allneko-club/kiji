import type { Metadata } from 'next';
import { CreatePostForm } from '@/app/my/posts/create/_components/create-post-form';


export const metadata: Metadata = {
  title: "記事作成",
  description: "記事を作成します。",
};

export default function Page() {
  return (
    <CreatePostForm />
  );
};
