import * as React from 'react';
import Link from 'next/link';
import { badgeVariants } from '@/components/ui/badge';
import { paths } from '@/config/paths';

type Props = {
  name: string;
}
export default function TagBadge({name}: Props) {
  return (
    <Link className={badgeVariants()} href={paths.tags.tag.getHref(name)}>
      {name}
    </Link>
  );
};