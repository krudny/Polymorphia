import { StudentTargetData, TargetResponseDTO } from "@/interfaces/api/target";
import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  TargetReducerActionType,
  TargetReducerState,
} from "@/providers/target/reducer/types";
import { QueryClient } from "@tanstack/react-query";

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
  appliedFilters: AppliedFiltersAdapter;
  targetId: number | null;
}

export interface TargetProviderProps {
  useTargets: (params: UseTargetsParams) => UseTargets;
  handleApplyFilters: (queryClient: QueryClient) => void;
  children: ReactNode;
}

export interface AppliedFiltersAdapter {
  [key: string]: string[] | string;
}

export interface UseTargets {
  data: TargetResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export interface UseTargetsParams {
  search?: string;
  groups?: string[];
  sortBy?: string[];
  sortOrder?: string[];
  searchBy?: string[];
  gradeStatus?: string[];
}
