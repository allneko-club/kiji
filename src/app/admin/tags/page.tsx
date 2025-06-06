import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import { getTags } from '@/models/tag';
import { TagsTable } from '@/app/admin/tags/_components/tags-table';

export const metadata: Metadata = { title: 'タグ' };

export default async function Page() {
  const tags = await getTags();

  return (
    <div>
      <Typography variant="h1">タグ</Typography>
      <TagsTable tags={tags} />
    </div>
  );
};
