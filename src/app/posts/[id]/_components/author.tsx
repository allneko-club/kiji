'use client'
import * as React from "react"
import { User } from '@prisma/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  user: User;
}

export function Author({ user }: Props) {

  return (
    <div className="flex space-x-2 my-4">
        <Avatar>
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
      <div>{user.name}</div>
    </div>
  )
}
