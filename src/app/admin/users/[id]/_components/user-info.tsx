'use client';
import { getFormattedDateTimeFromObj } from '@/lib/datetime';
import * as React from 'react';
import { useActionState } from 'react';
import { User } from '@prisma/client';
import { getRoleLabel } from '@/config/consts';
import { deleteUser } from '@/app/admin/users/[id]/actions';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { paths } from '@/config/paths';

export const UserInfo = ({ user }: { user: User }) => {

  return (
    <div>
      <DeleteUser id={user.id}/>
      <Avatar alt={user.name} src={user.image}>{user.name}</Avatar>
      <Typography>{user.name}</Typography>
      <Typography>{user.email}</Typography>
      <p>権限：{getRoleLabel(user.role)}</p>
      <p>登録日時：{getFormattedDateTimeFromObj(user.createdAt)}</p>
    </div>
  );
};


export function DeleteUser({ id }: { id: string }) {
  const router = useRouter();
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
          router.push(paths.admin.users.getHref());
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
