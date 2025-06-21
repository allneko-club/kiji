import { paths } from '@/config/paths';
import Icon from '@mui/material/Icon';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

export default function Logo() {
  return (
    <Link href={paths.home.getHref()}>
      <Icon sx={{ height: 32, width: 32, mr: 1 }}>
        <Image src="/logo.svg" width={32} height={32} alt="" />
      </Icon>
    </Link>
  );
}
