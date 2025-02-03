'use server';
import { redirect } from 'next/navigation';
import { paths } from '@/config/paths';
import { prisma } from '@/lib/prisma';
import { auth, signOut } from '@/auth';

export async function deleteAccount() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect(paths.auth.login.getHref());
  }

  await prisma.user.delete({
    where:{
      email: session.user.email,
    }
  });

  await signOut({ redirectTo: paths.auth.deleteAccountDone.getHref() })
}