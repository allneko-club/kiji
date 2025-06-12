'use client';
import * as React from 'react';
import { useActionState } from 'react';
import { deleteUser } from '@/app/admin/users/actions';
import { redirect } from 'next/navigation';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { paths } from '@/config/paths';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export function DeleteUser({ id }: { id: string }) {
  const [, action, isPending] = useActionState(deleteUser, null);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton aria-label="delete" color="error" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-delete-post"
        aria-describedby="alert-delete-post"
      >
        <form action={(formData) => {
          action(formData);
          handleClose();
          toast('削除しました');
          redirect(paths.admin.users.getHref());
        }}>
          <input name="id" hidden defaultValue={id} />
          <DialogTitle id="delete-post">
            削除確認
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-delete-post">
              ユーザーを削除してもよろしいですか？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>キャンセル</Button>
            <Button type="submit" color="error" loading={isPending} autoFocus>削除</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
