import NextLink from 'next/link';
import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import * as React from 'react';

export const metadata: Metadata = { title: '退会完了' };

export default function Page() {
  return (
    <div>
      <Typography variant="h1">
        アカウントを削除しました
      </Typography>
      <Button variant="contained" component={NextLink} href="/">
        ホームに移動
      </Button>
    </div>
  );
};
