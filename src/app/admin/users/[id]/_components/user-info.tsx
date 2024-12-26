'use client'
import { useUser } from '@/hooks/user';
import { notFound } from 'next/navigation';
import { getFormattedDateTime } from '@/lib/datetime';
import * as React from 'react';
import { H1 } from '@/components/ui/header';

export const UserInfo = ({id}: {id: string}) => {
  const { data } = useUser(id)

  if (!data) {
    notFound()
  }

  return (
    <div>
      <H1>{data.name}</H1>
      <p>メールアドレス：{data.email}</p>
      <p>権限：{data.role}</p>
      <p>登録日時：{getFormattedDateTime(data.createdAt)}</p>
    </div>
  )
}