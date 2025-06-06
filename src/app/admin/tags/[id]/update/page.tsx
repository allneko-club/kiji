import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { paths } from '@/config/paths';
import { getTag } from '@/models/tag';
import { UpdateTagForm } from '@/app/admin/tags/[id]/update/update-tag-form';

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
    <UpdateTagForm tag={tag} />
  );
};
