import * as React from "react"
import { Button } from '@/components/ui/button';
import { useDeletePost } from '@/hooks/posts/use-delete-post';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';

type DeletePostProps = {
  id: string;
};

export function DeletePost({ id }: DeletePostProps) {
  const deletePostMutation = useDeletePost();

  return (
    <ConfirmationDialog
      icon="danger"
      title="削除確認"
      body="投稿を削除してもよろしいですか？"
      triggerButton={<Button variant="destructive">削除</Button>}
      confirmButton={
        <Button
          variant="destructive"
          disabled={deletePostMutation.isPending}
          onClick={() => deletePostMutation.mutate({ id: id })}
        >
          削除
        </Button>
      }
    />
  )
}
