import { UserDetailsDTO } from "@/interfaces/api/user";
import { ProjectGroupResponseDTO } from "@/interfaces/api/temp";
import { Dispatch, SetStateAction } from "react";
import { useFilters } from "@/hooks/course/useFilters";
import {
  GradingReducerActionType,
  GradingReducerState,
} from "@/providers/grading/gradingReducer/types";

export type GradingContextInterface = {
  areFiltersOpen: boolean;
  setAreFiltersOpen: Dispatch<SetStateAction<boolean>>;
  isFiltersLoading: boolean;
  isFiltersError: boolean;
  // TODO: typing
  filters: ReturnType<typeof useFilters<GradingFilterId>>;
  search: string;
  setSearch: (search: string) => void;
  students: (UserDetailsDTO & { gainedXp?: string })[] | undefined;
  isStudentsLoading: boolean;
  projectGroups: ProjectGroupResponseDTO[] | undefined;
  isProjectGroupsLoading: boolean;
  isGradeLoading: boolean;
  state: GradingReducerState;
  dispatch: Dispatch<GradingReducerActionType>;
  submitGrade: () => void;
};

export type GradingFilterId = "sortOrder" | "sortBy" | "groups";
