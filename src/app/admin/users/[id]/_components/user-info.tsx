'use client';
import { getFormattedDateTimeFromObj } from '@/lib/datetime';
import * as React from 'react';
import { User } from '@prisma/client';
import { getRoleLabel } from '@/config/consts';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export const UserInfo = ({ user }: { user: User }) => {

  return (
    <>
      <Avatar alt={user.name} src={user.image}>{user.name}</Avatar>
      <Typography>{user.name}</Typography>
      <Typography>{user.email}</Typography>
      <p>権限：{getRoleLabel(user.role)}</p>
      <p>登録日時：{getFormattedDateTimeFromObj(user.createdAt)}</p>
    </>
  );
};
