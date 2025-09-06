import { useFilters } from "@/hooks/course/useFilters";
import { Dispatch, SetStateAction } from "react";

export interface FiltersModalProps<FilterIdType extends string> {
  filters: ReturnType<typeof useFilters<FilterIdType>>;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isFiltersLoading?: boolean;
  isFiltersError?: boolean;
  onFiltersApplied?: () => void;
}
