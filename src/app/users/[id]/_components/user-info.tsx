'use client'
import { getFormattedDateTimeFromObj } from '@/lib/datetime';
import * as React from 'react';
import { User } from '@prisma/client';

export const UserInfo = ({user}: {user: User}) => {

  return (
    <div>
      <h1>{user.name}</h1>
      <p>メールアドレス：{user.email}</p>
      <p>権限：{user.role}</p>
      <p>登録日時：{getFormattedDateTimeFromObj(user.createdAt)}</p>
    </div>
  )
}