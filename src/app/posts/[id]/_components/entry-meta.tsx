'use client';
import * as React from 'react';
import { User } from '@prisma/client';
import Box from '@mui/material/Box';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NextLink from 'next/link';

type Props = {
  author: User;
  category?: string;
  created: string;
}


export function EntryMeta({ author, created, category }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <Button component={NextLink} size="small" variant="outlined" href="#">
          {category}
        </Button>

        <AvatarGroup max={3}>
          <Avatar
            alt={author.name}
            src={author.image}
            sx={{ width: 24, height: 24 }}
          />
        </AvatarGroup>
        <Typography variant="caption">{author.name}</Typography>
      </Box>
      <Typography variant="caption">{created}</Typography>
    </Box>
  );
}
