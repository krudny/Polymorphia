import { useFilters } from "@/components/filters/useFilters";
import { Dispatch, SetStateAction } from "react";

export interface FilterablePageableContextInterface {
  filters: ReturnType<typeof useFilters>;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}
