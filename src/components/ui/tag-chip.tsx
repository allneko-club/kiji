import Chip from '@mui/material/Chip';
import * as React from 'react';
import NextLink from 'next/link';


type Props = {
  label: string;
  href: string;
}

export default function TagChip(props: Props) {

  return (
    <Chip
      clickable
      component={NextLink}
      {...props}
    />
  )
}