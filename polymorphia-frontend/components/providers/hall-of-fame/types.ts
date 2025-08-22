import { Dispatch, SetStateAction } from "react";
import { HallOfFameResponseDTO } from "@/interfaces/api/hall-of-fame";
import { FilterablePageableContextInterface } from "../filters/types";

export type HallOfFameAction =
  | { type: "ADD_TO_FILTER"; payload: { id: string; value: string } }
  | {
      type: "REMOVE_FROM_FILTER";
      payload: { id: string; value: string };
    };

export interface HallOfFameContextInterface
  extends FilterablePageableContextInterface {
  data: HallOfFameResponseDTO;
  // page: number;
  // setPage: Dispatch<SetStateAction<number>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  // isModalOpen: boolean;
  // setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  // filters: ReturnType<typeof useFilters>;
}
