import { paths } from '@/config/paths';
import Link from 'next/link';
import { UserNav } from '@/components/layouts/user-nav';
import { Search } from '@/components/layouts/search';
import MainNav from '@/components/layouts/main-nav';

export default async function Header() {
  return (
    <header>
      <div className="bg-gray-900">
        <div className="flex h-16 items-center px-4">
          <Link href={paths.home.getHref()} className="flex items-center space-x-3">
            <img src="/vercel.svg" className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Kiji</span>
          </Link>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  );
};
