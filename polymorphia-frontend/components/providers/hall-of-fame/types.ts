import { Dispatch, SetStateAction } from "react";
import { HallOfFameResponseDTO } from "@/interfaces/api/hall-of-fame";
import { FilterablePageableContextInterface } from "../filters/types";

export type HallOfFameFilterId =
  | "sortOrder"
  | "sortBy"
  | "groups"
  | "rankingOptions";

export interface HallOfFameContextInterface
  extends FilterablePageableContextInterface<HallOfFameFilterId> {
  data: HallOfFameResponseDTO;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}
