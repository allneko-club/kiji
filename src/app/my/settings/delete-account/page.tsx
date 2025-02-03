'use client'
import { Button } from '@/components/ui/button';
import { deleteAccount } from '@/app/my/settings/delete-account/actions';

export default function Page() {

  return (
    <div>
      <h1>アカウント削除</h1>
      <p>以下のボタンをクリックするとアカウントを削除します。</p>
      <Button onClick={deleteAccount} variant="destructive">
        アカウント削除
      </Button>
    </div>
  );
};
