import { HStack } from '@astryxdesign/core/HStack';
import { Pagination as AstryxPagination } from '@astryxdesign/core/Pagination';

type Props = {
  /** 0-based page index from the API. */
  currentPage: number;
  totalPages: number;
  onPageChange: (pageZeroBased: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <HStack hAlign="center" vAlign="center" paddingBlock={4} width="100%">
      <AstryxPagination
        variant="pages"
        page={currentPage + 1}
        totalPages={totalPages}
        onChange={(page) => onPageChange(page - 1)}
        siblingCount={2}
        size="md"
        label="Pagination"
      />
    </HStack>
  );
}
