import { useFilters } from "@/hooks/course/useFilters";
import { HallOfFameResponseDTO } from "@/interfaces/api/hall-of-fame";
import { Dispatch, RefObject, SetStateAction } from "react";

export type HallOfFameFilterId =
  | "sortOrder"
  | "sortBy"
  | "groups"
  | "rankingOptions";

export interface HallOfFameContextInterface {
  filters: ReturnType<typeof useFilters<HallOfFameFilterId>>;
  isFiltersLoading: boolean;
  isFiltersError: boolean;
  areFiltersOpen: boolean;
  setAreFiltersOpen: Dispatch<SetStateAction<boolean>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  hallOfFame: HallOfFameResponseDTO | undefined;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  findMe: () => void;
  recordRefs: RefObject<recordRefType>;
}

export type recordRefType = {
  [key: number]: HTMLDivElement | null;
};
