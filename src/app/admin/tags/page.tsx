import { TagsTable } from '@/app/admin/tags/_components/tags-table';
import { getTags } from '@/features/posts/models/tag';
import { paths } from '@/lib/paths';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import NextLink from 'next/link';

export const metadata: Metadata = { title: 'タグ' };

export default async function Page() {
  const tags = await getTags();

  return (
    <div>
      <Typography variant="h1">タグ</Typography>
      <Button variant="contained" component={NextLink} href={paths.admin.tags.create.getHref()}>
        追加
      </Button>
      <TagsTable tags={tags} />
    </div>
  );
}
