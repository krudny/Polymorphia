import { Dispatch, SetStateAction } from "react";
import { HallOfFameResponseDTO } from "@/interfaces/api/hall-of-fame";
import { useFilters } from "../filters/useFilters";

export type HallOfFameFilterId =
  | "sortOrder"
  | "sortBy"
  | "groups"
  | "rankingOptions";

export interface HallOfFameContextInterface {
  filters: ReturnType<typeof useFilters<HallOfFameFilterId>>;
  isFiltersLoading: boolean;
  isFiltersError: boolean;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  hallOfFame: HallOfFameResponseDTO | undefined;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}
