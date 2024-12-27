import { auth, signOut } from '@/auth';
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { paths } from '@/config/paths';
import { Lock, LogOut, User } from 'lucide-react';

export async function UserNav() {
  const session = await auth()
  async function logOut() {
    'use server';
    await signOut({ redirectTo: "/" });
  }

  return session?.user ? (<>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.user.image ?? ""} alt="@shadcn" />
            <AvatarFallback>KI</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session.user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* todo DropdownMenuItem の中に Link を入れられる？ */}
          {session.user.role === 'ADMIN' && (
            <Link href={paths.admin.root.getHref()}>
              <DropdownMenuItem>
                <Lock />ADMIN
              </DropdownMenuItem>
            </Link>
          )}
          <Link href={paths.my.root.getHref()}>
            <DropdownMenuItem>
              <User />マイページ
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        {/* todo buttonしかクリック判定がない。DropdownMenuItemにしたい。 */}
        <DropdownMenuItem>
          <LogOut />
          <form action={logOut}>
            <button type="submit">ログアウト</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </>) : (<>
    <Link href={paths.auth.login.getHref()}>
      <Button variant="outline">ログイン</Button>
    </Link>
  </>)
}