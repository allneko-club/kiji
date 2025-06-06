import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import { getTags } from '@/models/tag';
import { TagsTable } from '@/app/admin/tags/_components/tags-table';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import { paths } from '@/config/paths';

export const metadata: Metadata = { title: 'タグ' };

export default async function Page() {
  const tags = await getTags();

  return (
    <div>
      <Typography variant="h1">タグ</Typography>
      <Button
        variant="contained"
        component={NextLink}
        href={paths.admin.tags.create.getHref()}
      >
        追加
      </Button>
      <TagsTable tags={tags} />
    </div>
  );
};
