'use client';

import { deleteCategory } from '@/app/admin/categories/actions';
import { paths } from '@/config/paths';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { redirect } from 'next/navigation';
import * as React from 'react';
import { useActionState } from 'react';
import { toast } from 'react-toastify';

type DeleteCategoryProps = {
  id: number;
};

export function DeleteCategory({ id }: DeleteCategoryProps) {
  const [, action, isPending] = useActionState(deleteCategory, null);
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
        aria-labelledby="alert-delete-category"
        aria-describedby="alert-delete-category">
        <form
          action={(formData) => {
            action(formData);
            handleClose();
            toast('削除しました');
            redirect(paths.admin.categories.getHref());
          }}>
          <input name="id" hidden defaultValue={id} />
          <DialogTitle id="delete-category">削除確認</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-delete-category">
              カテゴリーを削除してもよろしいですか？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>キャンセル</Button>
            <Button type="submit" color="error" loading={isPending} autoFocus>
              削除
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
