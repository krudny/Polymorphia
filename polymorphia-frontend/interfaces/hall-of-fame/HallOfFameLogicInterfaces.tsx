import { Dispatch, SetStateAction } from "react";

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
  | { type: "RESET_FILTERS" };

export type HallOfFameContextType = {
  page: number;
  setPage: (newPage: number) => void;
  search: string;
  setSearch: (newSearch: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  filtersState: HallOfFameFilter[];
  filtersDispatch: Dispatch<HallOfFameAction>;
  isLoading: boolean;
};

export type HallOfFameConfirmButtonType = {
  filters: HallOfFameFilter[];
  setAppliedFiltersState: React.Dispatch<
    React.SetStateAction<HallOfFameFilter[]>
  >;
};

export type HallOfFameFilterID =
  | "sort"
  | "sortBy"
  | "groups"
  | "rankingOptions";
