import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { paths } from '@/config/paths';
import { UserNav } from '@/components/layouts/user-nav';
import { Search } from '@/components/layouts/search';
import MainNav from '@/components/layouts/main-nav';
import { ModeToggle } from '@/components/layouts/mode-toggle';
import { MobileNav } from '@/components/layouts/mobile-nav';

export default async function Header() {
  return (
    <header>
      <nav className="bg-gray-900">
        <div className="flex h-16 items-center px-4">
          <Link href={paths.home.getHref()} className="flex items-center space-x-3">
            <Image src="/vercel.svg" height={32} width={32} className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Kiji</span>
          </Link>
          <MainNav />
          <div className="ml-auto flex items-center space-x-1">
            <Suspense>
              <Search />
            </Suspense>
            <ModeToggle/>
            <UserNav />
            <MobileNav />
          </div>
        </div>
      </nav>
    </header>
  );
};
