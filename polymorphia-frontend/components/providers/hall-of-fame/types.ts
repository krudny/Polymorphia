import { Dispatch, SetStateAction } from "react";
import { HallOfFameResponseDTO } from "@/interfaces/api/DTO";
import { HallOfFameFilter } from "@/components/hall-of-fame/general/types";

export type HallOfFameAction =
  | { type: "OPEN_FILTER"; payload: { id: string } }
  | { type: "ADD_TO_FILTER"; payload: { id: string; value: string } }
  | {
      type: "REMOVE_FROM_FILTER";
      payload: { id: string; value: string };
    }
  | { type: "CLOSE_ALL_FILTERS" };

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
