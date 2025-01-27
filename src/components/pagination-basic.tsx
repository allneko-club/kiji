import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext, PaginationNextDisabled,
  PaginationPrevious, PaginationPreviousDisabled,
} from '@/components/ui/pagination';
import { usePathname, useSearchParams } from 'next/navigation';
import { cleanPage } from '@/lib/query-params';

export interface Props {
  perPage: number;
  totalPages: number;
}

export function PaginationBasic({ perPage, totalPages }:Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = cleanPage(searchParams.get('page') || 1);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const hasPrevPage = 1 < page;
  const hasNextPage = page * perPage < totalPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {hasPrevPage
            ? <PaginationPrevious href={createPageURL(page - 1)} />
            : <PaginationPreviousDisabled />
          }
        </PaginationItem>
        <PaginationItem>
          {hasPrevPage && (
            <PaginationLink href={createPageURL(page - 1)}>
              {page - 1}
            </PaginationLink>
          )}
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href={createPageURL(page)} isActive>
            {page}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
        {hasNextPage && (
          <PaginationLink href={createPageURL(page + 1)}>
            {page + 1}
          </PaginationLink>
        )}
        </PaginationItem>
        <PaginationItem>
          {hasNextPage
            ? <PaginationNext href={createPageURL(page + 1)} />
            : <PaginationNextDisabled />
          }
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
