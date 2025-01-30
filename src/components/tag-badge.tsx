import * as React from 'react';
import Link from 'next/link';
import { badgeVariants } from '@/components/ui/badge';

type Props = {
  name: string;
  href: string;
}
export default function TagBadge({name, href}: Props) {
  return (
    <Link className={badgeVariants()} href={href}>
      {name}
    </Link>
  );
};