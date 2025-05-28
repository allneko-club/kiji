import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cleanPage } from '@/lib/query-params';
import Pagination from '@mui/material/Pagination';

export interface Props {
  perPage: number;
  total: number;
}

export function PaginationBasic({ perPage, total }:Props) {
  const pathname = usePathname();
  const router = useRouter()
  const searchParams = useSearchParams();
  const page = cleanPage(searchParams.get('page') || 1);

  const handleChange = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      count={Math.ceil(total/perPage)}
      page={page}
      onChange={() => handleChange(page)}
    />
  )
}
