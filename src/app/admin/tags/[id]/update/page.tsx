import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { paths } from '@/config/paths';
import { getTag } from '@/models/tag';
import { TagForm } from '@/app/admin/tags/_components/tag-form';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = {title: "タグの編集"};

type Props = {
  params: Promise<{ id: string }>
}


export default async function Page({ params }: Props) {

  const id = Number((await params).id)
  if(Number.isNaN(id) || id < 1){
    redirect(paths.admin.tags.getHref());
  }

  const tag = await getTag(id)
  if(!tag){
    notFound()
  }

  return (
    <>
      <Typography variant="h1">タグの編集</Typography>
      <TagForm tag={tag} />
    </>
  );
};
