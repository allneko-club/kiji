import Chip from '@mui/material/Chip';
import NextLink from 'next/link';
import * as React from 'react';

type Props = {
  label: string;
  href: string;
};

export default function TagChip(props: Props) {
  return <Chip clickable component={NextLink} {...props} />;
}
