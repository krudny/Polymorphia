import { Dispatch, SetStateAction } from "react";

export interface TargetListTopBarProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setAreFiltersOpen: Dispatch<SetStateAction<boolean>>;
}
