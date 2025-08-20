import { Dispatch, SetStateAction } from "react";
import { HallOfFameResponseDTO } from "@/interfaces/api/hall-of-fame";
import { HallOfFameFilter } from "@/components/hall-of-fame/general/types";

export const HallOfFameActions = {
  OPEN_FILTER: "open_filter",
  ADD_TO_FILTER: "add_to_filter",
  REMOVE_FROM_FILTER: "remove_from_filter",
  CLOSE_ALL_FILTERS: "close_all_filters",
} as const;

export type HallOfFameAction =
  | { type: typeof HallOfFameActions.OPEN_FILTER; payload: { id: string } }
  | {
      type: typeof HallOfFameActions.ADD_TO_FILTER;
      payload: { id: string; value: string };
    }
  | {
      type: typeof HallOfFameActions.REMOVE_FROM_FILTER;
      payload: { id: string; value: string };
    }
  | { type: typeof HallOfFameActions.CLOSE_ALL_FILTERS };

export interface HallOfFameContextInterface {
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
}
