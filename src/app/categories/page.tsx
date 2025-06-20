import { paths } from '@/config/paths';
import { getCategories } from '@/models/category';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import NextLink from 'next/link';
import * as React from 'react';

export const metadata: Metadata = { title: 'カテゴリー' };

export default async function Page() {
  const categories = await getCategories();

  return (
    <>
      <Typography variant="h1">カテゴリー</Typography>
      <Stack direction="row" spacing={1}>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outlined"
            component={NextLink}
            href={paths.categories.detail.getHref(category.slug)}>
            {`${category.name} (${category._count.posts})`}
          </Button>
        ))}
      </Stack>
    </>
  );
}
