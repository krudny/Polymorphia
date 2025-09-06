import { StudentDetailsDTOWithType } from "@/interfaces/api/user";
import { ProjectGroupResponseDTO } from "@/interfaces/api/temp";
import { CriterionResponseDTO } from "@/interfaces/api/grade";
import { Dispatch, SetStateAction } from "react";
import {
  GradingReducerActionType,
  GradingReducerState,
} from "@/providers/grading/GradingContext";
import { useFilters } from "@/hooks/course/useFilters";

export type GradingContextInterface = {
  areFiltersOpen: boolean;
  setAreFiltersOpen: Dispatch<SetStateAction<boolean>>;
  isFiltersLoading: boolean;
  isFiltersError: boolean;
  // TODO: typing
  filters: ReturnType<typeof useFilters<GradingFilterId>>;
  search: string;
  setSearch: (search: string) => void;
  students: (StudentDetailsDTOWithType & { gainedXp?: string })[] | undefined;
  isStudentsLoading: boolean;
  projectGroups: ProjectGroupResponseDTO[] | undefined;
  isProjectGroupsLoading: boolean;
  isGradeLoading: boolean;
  criteria: CriterionResponseDTO[] | undefined;
  state: GradingReducerState;
  dispatch: Dispatch<GradingReducerActionType>;
  submitGrade: () => void;
};

export type GradingFilterId = "sortOrder" | "sortBy" | "groups";
