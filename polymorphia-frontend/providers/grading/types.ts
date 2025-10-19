import { Dispatch, SetStateAction } from "react";
import { useFilters } from "@/hooks/course/useFilters";
import {
  GradingReducerActionType,
  GradingReducerState,
} from "@/providers/grading/gradingReducer/types";
import { TargetResponseDTO } from "@/interfaces/api/grade/target";

export type GradingContextInterface = {
  areFiltersOpen: boolean;
  setAreFiltersOpen: Dispatch<SetStateAction<boolean>>;
  isFiltersLoading: boolean;
  isFiltersError: boolean;
  // TODO: typing
  filters: ReturnType<typeof useFilters<GradingFilterId>>;
  search: string;
  setSearch: (search: string) => void;
  targets: TargetResponseDTO[] | undefined;
  isTargetsLoading: boolean;
  isGradeLoading: boolean;
  state: GradingReducerState;
  dispatch: Dispatch<GradingReducerActionType>;
  submitGrade: () => void;
};

export type GradingFilterId = "sortOrder" | "sortBy" | "groups";
