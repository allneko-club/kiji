"use client"
import * as React from 'react';
import { toast } from 'react-toastify';
import { useActionState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePost } from '@/app/admin/posts/actions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/navigation';
import { paths } from '@/config/paths';

type DeletePostProps = {
  id: string;
};

export function DeletePost({ id }: DeletePostProps) {
  const router = useRouter();
  const [, action, isPending] = useActionState(deletePost, null);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-delete-post"
        aria-describedby="alert-delete-post"
      >
        <form action={(formData) =>{
          action(formData)
          handleClose()
          toast('削除しました')
          router.push(paths.admin.getHref())
        }}>
          <input name="id" hidden defaultValue={id} />
          <DialogTitle id="delete-post">
            削除確認
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-delete-post">
              投稿を削除してもよろしいですか？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>キャンセル</Button>
            <Button type="submit" color="error" loading={isPending} autoFocus>削除</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
)
}
