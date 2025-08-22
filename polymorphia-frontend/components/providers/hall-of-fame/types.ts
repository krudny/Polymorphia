import { Dispatch, SetStateAction } from "react";
import { HallOfFameResponseDTO } from "@/interfaces/api/hall-of-fame";
import { FilterablePageableContextInterface } from "../filters/types";

export interface HallOfFameContextInterface
  extends FilterablePageableContextInterface {
  data: HallOfFameResponseDTO;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}
