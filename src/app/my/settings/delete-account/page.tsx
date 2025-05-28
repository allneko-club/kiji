import type { Metadata } from 'next';
import * as React from 'react';
import Button from '@mui/material/Button';
import { deleteAccount } from '@/app/my/settings/delete-account/actions';

export const metadata: Metadata = { title: "アカウント削除" };

export default function Page() {

  return (
    <div>
      <h1>アカウント削除</h1>
      <p>以下のボタンをクリックするとアカウントを削除します。</p>
      <Button type="submit" color="error" onClick={deleteAccount}>
        アカウント削除
      </Button>
    </div>
  );
};
