import { Dispatch, SetStateAction } from "react";
import { HallOfFameResponseDTO } from "@/interfaces/api/DTO";

export interface HallOfFameFilter {
  id: HallOfFameFilterID;
  name: string;
  isOpen: boolean;
  minSelections: number;
  maxSelections: number;
  options: HallOfFameFilterOption[];
}

export interface HallOfFameFilterOption {
  label: string;
  value: string;
  isSelected: boolean;
  priority?: number;
}

export type HallOfFameAction =
  | { type: "OPEN_FILTER"; payload: { id: string } }
  | { type: "ADD_TO_FILTER"; payload: { id: string; value: string } }
  | {
      type: "REMOVE_FROM_FILTER";
      payload: { id: string; value: string };
    }
  | { type: "CLOSE_ALL_FILTERS" };

export type HallOfFameContextType = {
  data: HallOfFameResponseDTO;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  filtersState: HallOfFameFilter[];
  filtersDispatch: Dispatch<HallOfFameAction>;
  isLoading: boolean;
  appliedFiltersState: HallOfFameFilter[];
  setAppliedFiltersState: Dispatch<SetStateAction<HallOfFameFilter[]>>;
};

export type HallOfFameFilterID =
  | "sort"
  | "sortBy"
  | "groups"
  | "rankingOptions";
