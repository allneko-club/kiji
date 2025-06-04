"use client"
import NextLink from 'next/link';
import { paths } from '@/config/paths';
import * as React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import { Button, Stack } from '@mui/material';

export default function Sidebar(){
  return (
    <div>
      <Stack marginY={1} spacing={2} direction="row">
        <Button component={NextLink} href={paths.admin.getHref()}>
          <DashboardIcon/>
          ダッシュボード
        </Button>
        <Button component={NextLink} href={paths.admin.posts.getHref()}>
          <ArticleIcon/>
          投稿
        </Button>
        <Button component={NextLink} href={paths.admin.users.getHref()}>
          <PersonIcon/>
          ユーザー
        </Button>
      </Stack>
    </div>
  )
}