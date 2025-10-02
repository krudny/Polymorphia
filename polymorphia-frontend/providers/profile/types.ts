import { Dispatch, SetStateAction } from "react";

// TODO: handle filters
export type ProfileContextInterface = {
  areFiltersOpen: boolean;
  setAreFiltersOpen: Dispatch<SetStateAction<boolean>>;
};
