import { TagForm } from '@/app/admin/tags/_components/tag-form';
import { getTagById } from '@/features/posts/models/tag';
import { paths } from '@/lib/paths';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

export const metadata: Metadata = { title: 'タグの編集' };

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const id = Number((await params).id);
  if (Number.isNaN(id) || id < 1) {
    redirect(paths.admin.tags.getHref());
  }

  const tag = await getTagById(id);
  if (!tag) {
    notFound();
  }

  return (
    <>
      <Typography variant="h1">タグの編集</Typography>
      <TagForm tag={tag} />
    </>
  );
}
