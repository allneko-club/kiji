"use client"
import { paths } from '@/config/paths';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function MainNav()  {
  const links = [
    { href: paths.home.getHref(), label: 'home' },
    { href: "#", label: 'contact' },
  ]
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6 mx-6")}>
    {links.map((link) => (
      <Link key={link.href} href={link.href}
        className={cn(
          "text-white font-medium transition-colors",
          pathname !== link.href && "text-muted-foreground hover:text-white"
        )}
      >
        {link.label}
      </Link>
    ))}
    </nav>
  );
};

