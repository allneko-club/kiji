"use client"
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { mainMenu } from '@/config/consts';

export default function MainNav()  {
  const pathname = usePathname();

  return (
    <div className={cn("hidden sm:flex items-center space-x-4 lg:space-x-6 mx-6")}>
      {mainMenu.map((item) => (
        <Link key={item.href} href={item.href}
          className={cn(
            "text-white font-medium transition-colors",
            pathname !== item.href && "text-muted-foreground hover:text-white"
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

