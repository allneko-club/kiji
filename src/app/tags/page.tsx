import { getTags } from '@/models/tag';
import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

export const metadata: Metadata = {title: "タグ"};

export default async function Page() {
  const tags = await getTags();

  return (
    <div>
      <Typography component="h1" variant="h3">タグ</Typography>
      <div>
        {tags.map((tag) =>
          <Chip key={tag.id} label={tag.name} />
        )}
      </div>
    </div>
  );
};
