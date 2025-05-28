'use client'
import * as React from "react"
import { User } from '@prisma/client';
import { Avatar } from '@mui/material';

type Props = {
  user: User;
}

export function Author({ user }: Props) {

  return (
    <div>
      <Avatar alt={user.name} src={user.image}>{user.name}</Avatar>
      <div>{user.name}</div>
    </div>
  )
}
