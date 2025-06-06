import type { Metadata } from 'next';
import NextLink from 'next/link';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { paths } from '@/config/paths';
import { getTags } from '@/models/tag';

export const metadata: Metadata = { title: 'タグ' };

export default async function Page() {
  const tags = await getTags();

  return (
    <div>
      <Typography variant="h1">タグ</Typography>
      <div>
        {tags.map((tag) =>
          <Chip
            key={tag.id}
            label={tag.name}
            clickable
            component={NextLink}
            href={paths.tags.detail.getHref(tag.slug)}
          />,
        )}
      </div>
    </div>
  );
};
