'use client'
import * as React from "react"
import { User } from '@prisma/client';
import { Avatar, AvatarGroup, Typography } from '@mui/material';
import Box from '@mui/material/Box';

type Props = {
  author: User;
  created: string;
}


export function Author({ author, created }: Props) {
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
