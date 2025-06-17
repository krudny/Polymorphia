export interface PaginationProps {
  totalPages: number;
  onPageChangeAction: (selectedItem: { selected: number }) => void;
  forcePage?: number;
}
