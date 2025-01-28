"use client"
import * as React from "react"
import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { useActionState } from 'react';
import { deletePost } from '@/app/my/posts/[id]/actions';

type DeletePostProps = {
  id: string;
};

export function DeletePost({ id }: DeletePostProps) {
  const [, action, isPending] = useActionState(deletePost, null);

  return (
    <ConfirmationDialog
      icon="danger"
      title="削除確認"
      body="投稿を削除してもよろしいですか？"
      triggerButton={<Button variant="destructive">削除</Button>}
      confirmButton={
        <form>
          <input name="id" hidden defaultValue={id}/>
          <Button variant="destructive" loading={isPending} formAction={action}>
            削除
          </Button>
        </form>
      }
    />
  )
}
