"use client"
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { deletePost } from '@/app/my/posts/actions';
import {
  Dialog, DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import * as React from 'react';

type DeletePostProps = {
  id: string;
};

export function DeletePost({ id }: DeletePostProps) {
  const [, action, isPending] = useActionState(deletePost, null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">削除</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
        <form action={action}>
          <input name="id" hidden defaultValue={id} />
          <DialogHeader>
            <DialogTitle>削除確認</DialogTitle>
          </DialogHeader>

          <p className="py-4">投稿を削除してもよろしいですか？</p>

          <DialogFooter>
            <DialogClose asChild>
              <Button>キャンセル</Button>
            </DialogClose>
            <Button variant="destructive" loading={isPending}>
              削除
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
)
}
