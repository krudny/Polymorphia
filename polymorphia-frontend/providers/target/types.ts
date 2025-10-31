import { StudentTargetData, TargetResponseDTO } from "@/interfaces/api/target";
import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  TargetReducerActionType,
  TargetReducerState,
} from "@/providers/target/reducer/types";

export interface TargetContextInterface {
  state: TargetReducerState;
  dispatch: Dispatch<TargetReducerActionType>;
  selectedTarget: TargetResponseDTO | null;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  areFiltersOpen: boolean;
  setAreFiltersOpen: Dispatch<SetStateAction<boolean>>;
  targets: TargetResponseDTO[] | undefined;
  isTargetsLoading: boolean;
  onTargetSelect: (
    target: TargetResponseDTO,
    member: StudentTargetData
  ) => void;
  handleApplyFilters: () => void;
  applyFiltersCallback: (
    filters: AppliedFiltersAdapter
  ) => Record<string, string[] | string>;
}

export interface TargetProviderProps {
  children: ReactNode;
}

export interface AppliedFiltersAdapter {
  [key: string]: string[] | string;
}
