import * as React from 'react';
import Link from 'next/link';
import SvgIcon from '@mui/material/SvgIcon';
import { paths } from '@/config/paths';

export default function Logo() {
  return (
    <Link href={paths.home.getHref()}>
      <SvgIcon sx={{ height: 21, width: 40, mr: 2 }}>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155 1000">
          <path d="m577.3 0 577.4 1000H0z" fill="#fff"/>
        </svg>
      </SvgIcon>
    </Link>
  );
}
