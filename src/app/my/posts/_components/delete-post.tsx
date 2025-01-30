"use client"
import { useActionState } from 'react';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deletePost } from '@/app/my/posts/actions';
import {
  Dialog, DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { paths } from '@/config/paths';

type DeletePostProps = {
  id: string;
};

export function DeletePost({ id }: DeletePostProps) {
  const router = useRouter();
  const [, action, isPending] = useActionState(deletePost, null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
        <form action={(formData) =>{
          action(formData)
          toast('削除しました')
          router.push(paths.my.getHref())
        }}>
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
