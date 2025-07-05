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
  | { type: "TOGGLE_SORT_ORDER"; payload: { id: string } }
  | { type: "ADD_CATEGORY_SELECTION"; payload: { id: string; value: string } }
  | {
      type: "REMOVE_CATEGORY_SELECTION";
      payload: { id: string; value: string };
    }
  | { type: "TOGGLE_CATEGORY"; payload: { id: string } }
  | { type: "CLOSE_ALL_CATEGORIES" }

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
  setAppliedFiltersState: Dispatch<SetStateAction<HallOfFameFilter[]>>;
};

export type HallOfFameFilterID =
  | "sort"
  | "sortBy"
  | "groups"
  | "rankingOptions";

