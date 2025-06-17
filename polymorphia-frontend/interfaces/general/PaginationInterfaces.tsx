export interface PaginationProps {
  totalPages: number;
  onPageChangeAction: (selectedItem: number) => void;
  forcePage?: number;
}
