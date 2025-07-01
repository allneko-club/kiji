'use client';

import { paths } from '@/config/paths';
import ArticleIcon from '@mui/icons-material/Article';
import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import TagIcon from '@mui/icons-material/Tag';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import NextLink from 'next/link';
import * as React from 'react';

export default function AdminNav() {
  return (
    <div>
      <Stack marginY={1} spacing={2} direction="row">
        <Button component={NextLink} href={paths.admin.getHref()}>
          <DashboardIcon />
          ダッシュボード
        </Button>
        <Button component={NextLink} href={paths.admin.posts.getHref()}>
          <ArticleIcon />
          投稿
        </Button>
        <Button component={NextLink} href={paths.admin.categories.getHref()}>
          <CategoryIcon />
          カテゴリー
        </Button>
        <Button component={NextLink} href={paths.admin.tags.getHref()}>
          <TagIcon />
          タグ
        </Button>
        <Button component={NextLink} href={paths.admin.users.getHref()}>
          <PersonIcon />
          ユーザー
        </Button>
        <Button component={NextLink} href={paths.admin.media.getHref()}>
          <PermMediaIcon />
          メディア
        </Button>
        <Button component={NextLink} href={paths.admin.settings.getHref()}>
          <SettingsIcon />
          設定
        </Button>
      </Stack>
    </div>
  );
}
