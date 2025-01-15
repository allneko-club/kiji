'use client'
import { useUser } from '@/hooks/users/user';
import { notFound } from 'next/navigation';
import { getFormattedDateTime } from '@/lib/datetime';
import * as React from 'react';

export const UserInfo = ({id}: {id: string}) => {
  const { data } = useUser(id)

  if (!data) {
    notFound()
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <p>メールアドレス：{data.email}</p>
      <p>権限：{data.role}</p>
      <p>登録日時：{getFormattedDateTime(data.createdAt)}</p>
    </div>
  )
}