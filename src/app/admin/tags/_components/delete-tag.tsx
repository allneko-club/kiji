'use client';

import { deleteTag } from '@/app/admin/tags/actions';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

type DeleteTagProps = {
  id: number;
};

export function DeleteTag({ id }: DeleteTagProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async () => {
    setIsDeleting(true);
    const response = await deleteTag({ id });

    if (response?.data) {
      toast.success('削除しました');
    } else {
      toast.error('削除できなかったため、再度お試しください');
    }
    router.refresh();
    setOpen(false);
    setIsDeleting(false);
  };

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>削除確認</DialogTitle>
        <DialogContent>
          <DialogContentText>タグを削除してもよろしいですか？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>キャンセル</Button>
          <Button color="error" loading={isDeleting} autoFocus onClick={handleSubmit}>
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
