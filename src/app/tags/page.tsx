import TagChip from '@/components/ui/tag-chip';
import { paths } from '@/config/paths';
import { getTags } from '@/models/tag';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = { title: 'タグ' };

export default async function Page() {
  const tags = await getTags();

  return (
    <>
      <Typography variant="h1">タグ</Typography>
      <Stack direction="row" spacing={1}>
        {tags.map((tag) => (
          <TagChip key={tag.id} label={tag.name} href={paths.tags.detail.getHref(tag.slug)} />
        ))}
      </Stack>
    </>
  );
}
