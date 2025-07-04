'use client';

import { EntryMeta } from '@/app/posts/[slug]/_components/entry-meta';
import TagChip from '@/components/ui/tag-chip';
import { getFormattedDateTimeFromObj } from '@/lib/datetime';
import { paths } from '@/lib/paths';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Category, Post, Tag, User } from '@prisma/client';
import * as React from 'react';

type Props = {
  post: Post & { author: User; category: Category | null; tags: Tag[] };
};

export function PostDetail({ post }: Props) {
  return (
    <article>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <EntryMeta
          author={post.author}
          created={getFormattedDateTimeFromObj(post.createdAt)}
          category={post.category?.name}
        />

        <Typography variant="h1">{post.title}</Typography>

        <div dangerouslySetInnerHTML={{ __html: post.content }} />

        <Stack direction="row" spacing={1}>
          {post.tags.map((tag) => (
            <TagChip key={tag.id} label={tag.name} href={paths.tags.detail.getHref(tag.slug)} />
          ))}
        </Stack>
      </Container>
    </article>
  );
}
