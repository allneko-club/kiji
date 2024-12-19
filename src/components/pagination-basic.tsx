import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext, PaginationNextDisabled,
  PaginationPrevious, PaginationPreviousDisabled,
} from '@/components/ui/pagination';
import { usePathname, useSearchParams } from 'next/navigation';

export interface PaginationBasicProps {
  perPage: number;
  totalPages?: number;
}

export function PaginationBasic({ perPage = 100, totalPages }:PaginationBasicProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const hasPrevPage = 1 < currentPage;
  const hasNextPage = totalPages != null && currentPage * perPage < totalPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {hasPrevPage
            ? <PaginationPrevious href={createPageURL(currentPage - 1)} />
            : <PaginationPreviousDisabled />
          }
        </PaginationItem>
        <PaginationItem>
          {hasPrevPage && (
            <PaginationLink href={createPageURL(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          )}
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
        {hasNextPage && (
          <PaginationLink href={createPageURL(currentPage + 1)}>
            {currentPage + 1}
          </PaginationLink>
        )}
        </PaginationItem>
        <PaginationItem>
          {hasNextPage
            ? <PaginationNext href={createPageURL(currentPage + 1)} />
            : <PaginationNextDisabled />
          }
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
