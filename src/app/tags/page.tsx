import TagChip from '@/components/ui/tag-chip';
import { getTags } from '@/features/posts/models/tag';
import { paths } from '@/lib/paths';
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

      {tags.length === 0 && <Typography>タグはありあません。</Typography>}

      <Stack direction="row" spacing={1}>
        {tags.map((tag) => (
          <TagChip
            key={tag.id}
            label={`${tag.name} (${tag.count})`}
            href={paths.tags.detail.getHref(tag.slug)}
          />
        ))}
      </Stack>
    </>
  );
}
